$(document).ready(function() {

    // --- Global Calculator State ---
    let currentStep = 1;
    const totalSteps = 5; // 1:Setup, 2:House, 3:Transport, 4:Lifestyle, 5:Results
    let sectionsToInclude = {}; // Populated in step 1
    let currentFactors = {}; // Set on init and country change
    let householdSize = 1;
    let calculatedFootprints = { // Stored in TONNES (per person for results)
        household: 0, flights: 0, car: 0, motorbike: 0,
        public_transport: 0, secondary: 0, total: 0
    };

    // --- Elements Cache ---
    const $calculatorSection = $('#calculator');
    const $stepIndicatorItems = $('#calculator-steps .step-item');
    const $stepContentDivs = $('#calculator-content .calculator-step');
    const $countrySelect = $('#calc-country');
    const $peopleInput = $('#calc-people');
    const $includeCheckboxes = $('#include-sections input[type="checkbox"]');
    const $prevButton = $('#calc-prev-btn');
    const $nextButton = $('#calc-next-btn');
    const $householdShareDisplay = $('#household-share-display'); // Span to show household share basis

    // --- Initialization ---
    function initializeCalculator() {
        console.log("Initialising calculator...");
        currentStep = 1;
        currentFactors = getCurrentFactors($countrySelect.val()); // Get initial factors
        householdSize = parseInt($peopleInput.val()) || 1;
        readIncludeSelections(); // Get initial checkbox values
        updateUILabelsAndUnits();
        showStep(currentStep);
        initializeTooltips();
        bindEvents();
        $householdShareDisplay.text(householdSize); // Initial display
    }

    // --- Event Binding ---
    function bindEvents() {
        $countrySelect.on('change', handleGlobalSettingChange);
        $peopleInput.on('change', handleGlobalSettingChange); // Also handle HH size change
        $includeCheckboxes.on('change', readIncludeSelections);
        $nextButton.on('click', handleNextClick);
        $prevButton.on('click', handlePrevClick);
        // Input changes don't need immediate full recalc, happens before step 5
    }

    // --- Event Handlers ---
    function handleGlobalSettingChange() {
        currentFactors = getCurrentFactors($countrySelect.val());
        let newSize = parseInt($peopleInput.val()) || 1;
        if(newSize < 1) newSize = 1; // Ensure min size 1
        householdSize = newSize;
        $peopleInput.val(householdSize); // Correct input if invalid
        $householdShareDisplay.text(householdSize); // Update display in step 2

        updateUILabelsAndUnits();
        resetCalculatedFootprints();
        // If on results step, recalculate immediately
        if (currentStep === totalSteps) {
             calculateAllFootprintsAndUpdateResults();
        }
        console.log("Global settings updated. Country:", $countrySelect.val(), "Household Size:", householdSize);
    }

    function readIncludeSelections() {
        sectionsToInclude = {}; // Reset first
        $includeCheckboxes.each(function() {
            sectionsToInclude[$(this).val()] = $(this).is(':checked'); // Use value attr ('household', 'flights', etc.)
        });
        console.log("Included Sections:", sectionsToInclude);
    }

    function handleNextClick() {
        if (currentStep < totalSteps) {
             if (currentStep === 1) {
                 readIncludeSelections(); // Ensure selections are current before deciding skips
                if (householdSize < 1) {
                    alert("Household Size must be at least 1."); $peopleInput.focus(); return;
                 }
             }
             // Proceed to find the next step that shouldn't be skipped
            advanceToNextAvailableStep(currentStep + 1);
         }
    }

    function handlePrevClick() {
         if (currentStep > 1) {
             // Go back to the previous step that wasn't skipped
            advanceToPreviousAvailableStep(currentStep - 1);
        }
    }

    // --- Step Navigation (Handles Skipping) ---
    function advanceToNextAvailableStep(targetStep) {
        if (targetStep > totalSteps) return; // Reached end

        let skip = false;
        switch (targetStep) {
            case 2: skip = !sectionsToInclude.household; break;
            case 3: skip = !(sectionsToInclude.flights || sectionsToInclude.car || sectionsToInclude.motorbike || sectionsToInclude.public_transport); break;
            case 4: skip = !sectionsToInclude.secondary; break;
            case 5:
                console.log("Calculating results before showing Step 5.");
                calculateAllFootprintsAndUpdateResults(); // Calculate BEFORE showing results
                break;
        }

        if (skip) {
            console.log(`Skipping step ${targetStep}.`);
            advanceToNextAvailableStep(targetStep + 1); // Recursively try next
        } else {
            currentStep = targetStep;
            showStep(currentStep); // Show the valid step
        }
    }

    function advanceToPreviousAvailableStep(targetStep) {
        if (targetStep < 1) return; // Reached start

        let skip = false;
         switch (targetStep) {
             case 2: skip = !sectionsToInclude.household; break;
             case 3: skip = !(sectionsToInclude.flights || sectionsToInclude.car || sectionsToInclude.motorbike || sectionsToInclude.public_transport); break;
             case 4: skip = !sectionsToInclude.secondary; break;
         }

        if (skip) {
             console.log(`Skipping back over step ${targetStep}.`);
            advanceToPreviousAvailableStep(targetStep - 1); // Recursively try previous
        } else {
             currentStep = targetStep;
             showStep(currentStep); // Show valid step
        }
    }


    // --- UI Display ---
    function showStep(stepNum) {
        $stepContentDivs.hide();
        $(`#step-${stepNum}-content`).stop(true, true).fadeIn(300);

        // Update Step Indicator classes
        $stepIndicatorItems.removeClass('active completed').each(function() {
            const itemStep = $(this).data('step');
            if (itemStep < stepNum) $(this).addClass('completed');
            else if (itemStep === stepNum) $(this).addClass('active');
        });

        // Update Nav Buttons state and text
        $prevButton.prop('disabled', stepNum === 1);
        const isLastDataStep = stepNum === totalSteps - 1;
        const isOnResultsStep = stepNum === totalSteps;
        $nextButton.html(isLastDataStep ? 'View Results <i class="fas fa-calculator ms-1"></i>' : (isOnResultsStep ? 'Finish' : 'Next <i class="fas fa-arrow-right ms-1"></i>'));
        $nextButton.prop('disabled', isOnResultsStep);

        // Conditional display *within* Step 3 (Transport) based on selections
         if (stepNum === 3) {
            $('#transport-flights').toggle(sectionsToInclude.flights);
            $('#transport-car').toggle(sectionsToInclude.car);
            $('#transport-motorbike').toggle(sectionsToInclude.motorbike);
            $('#transport-busrail').toggle(sectionsToInclude.public_transport);
             const noTransport = !(sectionsToInclude.flights || sectionsToInclude.car || sectionsToInclude.motorbike || sectionsToInclude.public_transport);
            $('#no-transport-selected').toggle(noTransport);
             // Update electric car info display if car section is shown
             if (sectionsToInclude.car) {
                 $('#electric-car-factor-info').toggle($('#car1-fuel').val() === 'electric');
             }
         }
         console.log(`Showing Step: ${stepNum}`);
    }

    function initializeTooltips() {
        const tooltipTriggerList = [].slice.call($calculatorSection[0].querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(el => new bootstrap.Tooltip(el, { trigger: 'hover' }));
    }

    function updateUILabelsAndUnits() {
         if (!currentFactors) { console.error("Cannot update UI: currentFactors not set."); return; }
        $('.unit-currency').text(currentFactors.currency);
        $('.unit-distance').text(currentFactors.distanceUnit);
        $('.distance-unit-short').text(currentFactors.distanceUnitShort || currentFactors.distanceUnit);
        // Re-run tooltip initialization in case new elements became visible/changed
         initializeTooltips();
        // Potentially add logic here to adjust which UNIT options are visible/default
        // based on currentFactors.volumeUnit or distanceUnit if needed (like previous attempt)
    }

    // --- Calculation Logic ---
    function resetCalculatedFootprints() {
        calculatedFootprints = { household: 0, flights: 0, car: 0, motorbike: 0, public_transport: 0, secondary: 0, total: 0 };
        // Clear result displays visually
        $('#grand-total-footprint, #grand-total-footprint-copy, #collective-footprint-results').text('--.--');
        $('#results-breakdown-details').html('<p class="text-muted col-12">Calculating...</p>');
        $('#reduction-tips-list-results').html('<li class="list-group-item text-center text-muted">Calculating tips...</li>');
        console.log("Stored footprint values reset.");
    }

    function calculateAllFootprintsAndUpdateResults() {
         console.log("Calculating final results...");
         resetCalculatedFootprints(); // Start fresh

         // Use the *currentFactors* accessible in this scope
         const factors = currentFactors; // Assign to local const for clarity within calc functions

         // --- Calculate contribution from each *selected* section ---
         // HOUSEHOLD: Calculate total Kg for house, then divide for per-person tonnes
         if (sectionsToInclude.household) {
             const householdRawKg = calculateHouseholdFootprint(factors); // Pass factors
             calculatedFootprints.household = (householdRawKg / householdSize) / 1000; // kg -> tonnes/person
         }
         // OTHER SECTIONS: Assumed per-person, just convert kg -> tonnes
         if (sectionsToInclude.flights) calculatedFootprints.flights = calculateFlightsFootprint(factors) / 1000;
         if (sectionsToInclude.car) calculatedFootprints.car = calculateCarFootprint(factors) / 1000;
         if (sectionsToInclude.motorbike) calculatedFootprints.motorbike = calculateMotorbikeFootprint(factors) / 1000;
         if (sectionsToInclude.public_transport) calculatedFootprints.public_transport = calculatePublicTransportFootprint(factors) / 1000;
         if (sectionsToInclude.secondary) calculatedFootprints.secondary = calculateSecondaryFootprint(factors) / 1000; // Pass factors FIX

        // SUM TOTAL (already in per-person tonnes)
        calculatedFootprints.total = Object.values(calculatedFootprints).reduce((sum, val) => sum + val, 0);

        displayFullResults(); // Update Step 5 UI
     }

    function getInputValue(selector) { // Safer input getter
         const value = parseFloat($(selector).val()?.replace(/,/g, ''));
         return isNaN(value) || value < 0 ? 0 : value; // Return 0 if NaN or negative
     }

    // --- Individual Calculation Functions (now accept factors) ---
    function calculateHouseholdFootprint(factors) {
        let totalKg = 0;
        // Use factors passed in... (Same internal logic as previous code, ensure null checks on factors)
        totalKg += getInputValue('#house-electricity') * (factors.electricity_grid_intensity ?? 0);
        // ... Add rest of NatGas, Oil, Coal, LPG, Propane, Wood calculations here, using 'factors.factor_key'
         // Safely calculate NatGas
         const natGasVal = getInputValue('#house-natgas'); const natGasUnit = $('#house-natgas-unit').val();
         if (natGasVal > 0) {
             let factor = null; let value = natGasVal;
             if (natGasUnit === 'kwh' && factors.natural_gas_kwh != null) factor = factors.natural_gas_kwh;
             else if (natGasUnit === 'therms' && factors.natural_gas_therms != null) factor = factors.natural_gas_therms;
             else if (natGasUnit === 'm3' && factors.natural_gas_m3 != null) factor = factors.natural_gas_m3;
             // Basic fallback: Try converting to kWh IF kWh factor exists
             else if (factors.natural_gas_kwh != null) {
                 factor = factors.natural_gas_kwh;
                 if (natGasUnit === 'therms') value = natGasVal * unitConversions.therms_to_kwh;
                 else if (natGasUnit === 'm3') value = natGasVal * unitConversions.m3_natgas_to_kwh;
                 else value = 0; // Cannot convert unknown unit
             }
             if(factor != null && value > 0) totalKg += value * factor;
             else console.warn(`No usable NatGas factor for unit: ${natGasUnit}`);
         }

         // Safely calculate Heating Oil
         const oilVal = getInputValue('#house-heating-oil'); const oilUnit = $('#house-heating-oil-unit').val();
         if(oilVal > 0){
            let factor=null, value=oilVal, useConverted=false;
            if(oilUnit === 'litres' && factors.heating_oil_litre != null) factor = factors.heating_oil_litre;
            else if(oilUnit === 'gallons_uk' && factors.heating_oil_gallon_uk != null) factor = factors.heating_oil_gallon_uk;
            else if(oilUnit === 'gallons_us' && factors.heating_oil_gallon_us != null) factor = factors.heating_oil_gallon_us;
            // Fallback to converting to litres IF litre factor exists
            else if(factors.heating_oil_litre != null){
                factor = factors.heating_oil_litre;
                if(oilUnit === 'gallons_uk') value = oilVal * unitConversions.gallons_uk_to_litres;
                else if(oilUnit === 'gallons_us') value = oilVal * unitConversions.gallons_us_to_litres;
                else value = 0;
                useConverted=true;
            }
            if(factor != null && value > 0) totalKg += value * factor;
            else console.warn(`No usable Heating Oil factor for unit: ${oilUnit}`);
         }

        // Other fuels
        totalKg += getInputValue('#house-coal') * (factors.coal_tonne ?? 0);
        totalKg += getInputValue('#house-lpg') * (factors.lpg_litre ?? 0); // Assumes litre input
        const propaneVal = getInputValue('#house-propane'); const propaneUnit = $('#house-propane-unit').val();
        if(propaneVal > 0){
             let factor=null, value = propaneVal;
             if(propaneUnit === 'litres' && factors.propane_litre!=null) factor = factors.propane_litre;
             else if (propaneUnit === 'gallons_us' && factors.propane_gallon_us !=null) factor = factors.propane_gallon_us;
             if(factor !=null && value > 0) totalKg += value*factor;
             else console.warn(`No usable Propane factor for unit: ${propaneUnit}`);
        }
        totalKg += getInputValue('#house-wood') * (factors.wood_pellets_tonne ?? 0);

        return totalKg;
    }

    function calculateFlightsFootprint(factors) {
        let totalKg = 0; const isKm = factors.distanceUnit === 'km'; const distUnitKey = isKm ? '_km' : '_mi';
        const numDom = getInputValue('#flight-domestic'), numSh = getInputValue('#flight-short'), numLo = getInputValue('#flight-long');
        const distDom = factors[`flight_typical_dist_domestic${distUnitKey}`] ?? 0, distSh = factors[`flight_typical_dist_short${distUnitKey}`] ?? 0, distLo = factors[`flight_typical_dist_long${distUnitKey}`] ?? 0;
        const factorDom = factors[`flight_domestic${distUnitKey}_factor`] ?? 0, factorSh = factors[`flight_short${distUnitKey}_factor`] ?? 0, factorLo = factors[`flight_long${distUnitKey}_factor`] ?? 0;
        totalKg += numDom * (distDom * 2) * factorDom; totalKg += numSh * (distSh * 2) * factorSh; totalKg += numLo * (distLo * 2) * factorLo;
        return totalKg;
    }

    function calculateCarFootprint(factors) {
        let totalKg = 0; const isKm = factors.distanceUnit === 'km'; const distUnitKey = isKm ? '_km' : '_mi';
        const dist1 = getInputValue('#car1-distance'); const fuelType1 = $('#car1-fuel').val();
        if (dist1 > 0) {
            let factorPerDist = 0;
            if (fuelType1 === 'electric') {
                 const kwhPerDist = factors[`car_electric_kwh${distUnitKey}`] ?? 0;
                 factorPerDist = kwhPerDist * (factors.electricity_grid_intensity ?? 0);
            } else {
                 factorPerDist = factors[`car_${fuelType1}${distUnitKey}`] ?? factors[`car_petrol${distUnitKey}`] ?? 0; // Default petrol
            }
            totalKg += dist1 * factorPerDist;
        }
        return totalKg;
    }

    function calculateMotorbikeFootprint(factors) {
        let totalKg = 0; const isKm = factors.distanceUnit === 'km'; const distUnitKey = isKm ? '_km' : '_mi';
        const dist1 = getInputValue('#bike1-distance'); const size1 = $('#bike1-size').val();
        if (dist1 > 0) {
            const factor = factors[`motorbike_${size1}${distUnitKey}`] ?? factors[`motorbike_medium${distUnitKey}`] ?? 0;
            totalKg += dist1 * factor;
        }
        return totalKg;
    }

    function calculatePublicTransportFootprint(factors) {
        let totalKg = 0; const isKm = factors.distanceUnit === 'km'; const distUnitKey = isKm ? '_km' : '_mi';
        const getFactor = (mode) => factors[`pt_${mode}${distUnitKey}`] ?? 0;
        const tramFactor = getFactor('tram_subway') || getFactor('tram'); // Use combined/tram factor
        totalKg += getInputValue('#pt-bus') * getFactor('bus'); totalKg += getInputValue('#pt-coach') * getFactor('coach'); totalKg += getInputValue('#pt-train-local') * getFactor('train_local');
        totalKg += getInputValue('#pt-train-long') * getFactor('train_long'); totalKg += getInputValue('#pt-tram') * tramFactor; totalKg += getInputValue('#pt-taxi') * getFactor('taxi');
        // Note: pt-subway input is hidden, tramFactor covers tram/metro/subway
        return totalKg;
    }

    function calculateSecondaryFootprint(factors) { // FIXED: Pass factors!
        let totalKg = 0;
        const secFactors = factors.secondary_factors || {}; // Use passed factors
        const getSpend = getInputValue;
        const dietType = $('#sec-food-diet').val();
        const foodFactorKey = `food_${dietType}`;
        const foodSpend = getSpend('#sec-food-amount');
        totalKg += foodSpend * (secFactors[foodFactorKey] ?? secFactors.food_average ?? 0);

        // Iterate over other lifestyle spending inputs
        $('#step-4-content .calculator-input[id^="sec-"]').not('#sec-food-amount, #sec-food-diet').each(function() {
             const inputId = $(this).attr('id');
             const factorKey = inputId.substring(4); // e.g., "clothing"
             const spendValue = getSpend(`#${inputId}`);
             totalKg += spendValue * (secFactors[factorKey] ?? 0);
              if(spendValue > 0 && secFactors[factorKey]==null) console.warn(`Missing sec. factor: ${factorKey}`);
        });
        return totalKg;
     }


    // --- Results Display ---
    function displayFullResults() {
        const totalTonnes = calculatedFootprints.total;
        const avgFootprint = currentFactors.avgFootprint;

        $('#grand-total-footprint').text(totalTonnes.toFixed(2));
        $('#grand-total-footprint-copy').text(totalTonnes.toFixed(2));
        $('#collective-footprint-results').text((totalTonnes * 1000).toLocaleString(undefined, {maximumFractionDigits: 0}));
        $('#results-household-size').text(householdSize);

        // Generate Breakdown HTML
        const $breakdownContainer = $('#results-breakdown-details').empty();
        let breakdownHtml = '', hasPositiveContribution = false;
        const categoryOrder = ['household', 'car', 'flights', 'motorbike', 'public_transport', 'secondary'];
        categoryOrder.forEach(key => {
             if (sectionsToInclude[key]) { // Only show if section was included
                 const valueTonnes = calculatedFootprints[key] || 0;
                 // Include in breakdown if contribution is significant enough (e.g., > 0.01 t)
                 if (valueTonnes > 0.005) {
                     hasPositiveContribution = true;
                     const percentage = totalTonnes > 0 ? ((valueTonnes / totalTonnes) * 100) : 0;
                     breakdownHtml += `<div class="col-6 col-sm-4 col-md-3 breakdown-item">
                         <i class="fas ${getIconForKey(key)} fa-fw me-1"></i> ${getDisplayNameForKey(key)}:
                         <strong class="d-block">${valueTonnes.toFixed(2)} t</strong>
                         ${totalTonnes > 0 ? `<small>(${percentage.toFixed(0)}%)</small>` : ''}
                     </div>`;
                 }
             }
         });
        if (!hasPositiveContribution && totalTonnes < 0.01) { breakdownHtml = '<p class="text-muted text-center col-12">No significant emissions calculated based on input.</p>'; }
        $breakdownContainer.html(breakdownHtml || '<p class="text-muted text-center col-12">Select sections and enter data first.</p>');

        // Comparison Text
         let comparisonMsg = (avgFootprint && avgFootprint > 0) ? (totalTonnes > avgFootprint * 1.15 ? '<span class="text-danger">Higher than</span>' : (totalTonnes < avgFootprint * 0.85 ? '<span class="text-success">Lower than</span>' : 'Similar to')) : 'compared to';
         $('#comparison-text-results').html(comparisonMsg);
        $('#results-country-name').text(currentFactors.name || 'country');
        $('#results-avg-footprint').text(avgFootprint?.toFixed(1) || 'N/A');

        // Generate Tips
         generateReductionTipsResults();

         // Update Location Name (Using sessionStorage if available)
         const locationName = sessionStorage.getItem('weatherLocationName') || currentFactors.name || 'your region';
         $('.location-name').text(locationName.split(',')[0].trim()); // Update all instances

        console.log("Results displayed. Total tCO2e/person:", totalTonnes.toFixed(2));
     }

    function getIconForKey(key) { return { household: 'fa-home', flights: 'fa-plane', car: 'fa-car', motorbike: 'fa-motorcycle', public_transport: 'fa-bus-alt', secondary: 'fa-shopping-basket' }[key] || 'fa-leaf'; }
    function getDisplayNameForKey(key) { return { household: 'Household', flights: 'Flights', car: 'Car', motorbike: 'Motorbike', public_transport: 'Bus/Rail/Taxi', secondary: 'Lifestyle' }[key] || 'Other'; }

    // Tips Generation
    function generateReductionTipsResults() {
         const $tipsList = $('#reduction-tips-list-results').empty();
         const totalTonnes = calculatedFootprints.total;
         if (totalTonnes < 0.01) { $tipsList.html('<li class="list-group-item text-center text-muted">Enter data for reduction tips.</li>'); return; }

        let contributions = []; // Filter included sections with contribution > 0.01t
         Object.keys(calculatedFootprints).forEach(key => { if (key !== 'total' && sectionsToInclude[key] && calculatedFootprints[key] > 0.01) contributions.push({ name: key, value: calculatedFootprints[key] }); });
         contributions.sort((a, b) => b.value - a.value); // Sort descending

        let tipsAdded = 0;
         contributions.slice(0, 3).forEach(item => { // Top 3 contributors
            let tipText = ""; const percentage = (item.value / totalTonnes) * 100; const valueStr = `(${item.value.toFixed(1)}t, ${percentage.toFixed(0)}%)`;
            switch(item.name) {
                case 'household': tipText = `<strong>Home Energy ${valueStr}:</strong> Reduce use (efficiency, renewables).`; break;
                case 'flights': tipText = `<strong>Flights ${valueStr}:</strong> Reduce trips, fly economy/direct, alternatives?`; break;
                case 'car': tipText = `<strong>Car Use ${valueStr}:</strong> Drive less, maintain car, consider EV/hybrid.`; break;
                case 'secondary': tipText = `<strong>Lifestyle ${valueStr}:</strong> Check diet (less meat/waste), consumption (buy less/durable).`; break;
                case 'motorbike': tipText = `<strong>Motorbike ${valueStr}:</strong> Ride efficiently. Walk/cycle short trips?`; break;
                case 'public_transport': tipText = `<strong>Public Transport ${valueStr}:</strong> Good! Prefer rail for long distances.`; break;
            }
            if(tipText) { $tipsList.append(`<li class="list-group-item"><i class="fas fa-caret-right text-success me-2"></i>${tipText}</li>`); tipsAdded++; }
        });
        if (tipsAdded === 0) $tipsList.append(`<li class="list-group-item">Footprint seems low. Explore <a href="#duties">systemic actions</a>.</li>`);
        else if (tipsAdded < 2) $tipsList.append(`<li class="list-group-item"><i class="fas fa-caret-right text-success me-2"></i><strong>General:</strong> Reducing food waste & more plant-based meals often helps.</li>`);
     }

    // --- Start the calculator ---
    initializeCalculator();

}); // End of $(document).ready()
