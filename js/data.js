const roleDuties = {
    // == HEALTHCARE ==
    "healthcare": {
        "title": "Healthcare Sector",
        "roles": {
            "doctor_physician": { "title": "Doctor/Physician (General)", "duties": [
                    "Educate patients on climate-sensitive health risks (heat stress, allergies, vector-borne diseases, respiratory illness from pollution).",
                    "Incorporate climate change impacts into diagnosis & treatment plans (e.g., consider air quality for asthma patients).",
                    "Advocate for sustainable practices within clinics/hospitals (energy efficiency, waste reduction, greener procurement).",
                    "Promote co-benefits: prescribe active transport (walking/cycling) or plant-based diets for health & environment.",
                    "Engage with medical associations on climate action & policy advocacy." ]
            },
            "surgeon": { "title": "Surgeon", "duties": [
                    "Minimize operating room waste (single-use plastics, packaging) through selective use & proper segregation.",
                    "Advocate for reusable or reprocessable surgical instruments where clinically appropriate & safe.",
                    "Support hospital initiatives for energy efficiency in surgical suites (HVAC management during downtime).",
                    "Educate surgical teams on the environmental impact of anesthetic gases & promote lower-impact alternatives when safe.",
                    "Contribute to research on sustainable surgical practices." ]
            },
            "cardiologist": { "title": "Cardiologist", "duties": [
                    "Educate patients on links between air pollution (fossil fuels) and cardiovascular disease.",
                    "Advise vulnerable patients during extreme heat events.",
                    "Promote lifestyle changes (diet, exercise, smoking cessation) with cardiovascular & climate co-benefits.",
                    "Advocate for clean air policies to reduce cardiovascular burdens.",
                    "Support research on climate change impacts on heart health." ]
            },
             "neurologist": { "title": "Neurologist", "duties": [
                     "Raise awareness about the neurological impacts of air pollution and extreme heat.",
                     "Counsel patients with conditions worsened by climate factors (e.g., MS relapses in heat).",
                     "Support research into climate change effects on neurological disorders and stroke risk.",
                     "Advocate for policies reducing neurotoxic pollutants often associated with fossil fuels.",
                     "Promote brain health strategies (diet, exercise) with environmental co-benefits." ]
             },
            "nurse_rn_cna": { "title": "Nurse (RN/CNA)", "duties": [
                    "Identify & assist patients vulnerable to climate impacts (heat, storms, air quality).",
                    "Educate patients and families on climate-health connections and adaptation measures.",
                    "Implement resource conservation on wards (reduce linen waste, conserve water/energy).",
                    "Participate in hospital green teams/sustainability committees.",
                    "Act as sustainability champions, promoting eco-friendly practices among colleagues." ]
            },
            "therapist_ot_pt": { "title": "Therapist (OT/PT)", "duties": [
                    "Incorporate climate resilience into patient rehab (e.g., heat safety for outdoor mobility).",
                    "Prescribe and facilitate access to active transportation (walking, cycling) as therapy.",
                    "Design adaptive equipment & environments considering resource efficiency & sustainability.",
                    "Advocate for accessible green spaces beneficial for physical & mental rehabilitation.",
                    "Reduce waste associated with therapeutic supplies & equipment." ]
            },
            "pharmacist": { "title": "Pharmacist", "duties": [
                    "Counsel patients on proper medication disposal (avoid flushing, use take-back programs) to prevent water contamination.",
                    "Optimize inventory management to minimize drug waste due to expiration.",
                    "Advocate for reduced & sustainable packaging from manufacturers.",
                    "Promote energy efficiency & waste reduction within pharmacy operations.",
                    "Stay informed on climate impacts affecting drug stability & supply chains." ]
            },
            "dentist": { "title": "Dentist/Dental Hygienist", "duties": [
                    "Reduce single-use plastics & sterilisation waste through optimized practices.",
                    "Implement water conservation measures (e.g., using efficient suction systems).",
                    "Choose digital records over paper charts where feasible.",
                    "Select dental materials with lower environmental impact when clinically appropriate.",
                    "Educate patients on links between overall health (including diet influenced by climate) and oral health." ]
            },
            "mental_health_prof": { "title": "Mental Health Professional", "duties": [
                    "Recognize & address climate anxiety, eco-grief, and trauma from climate-related events.",
                    "Incorporate nature-based therapies and promote time outdoors.",
                    "Help individuals build psychological resilience to climate change stressors.",
                    "Advocate for community mental health resources in climate adaptation planning.",
                    "Connect patients with community action groups as a therapeutic outlet for climate distress." ]
            },
            "hospital_admin_hc": { "title": "Hospital/Clinic Administrator (Healthcare)", "duties": [ /* Renamed to avoid clash */
                 "Develop & implement facility sustainability plans (energy, water, waste reduction targets).",
                 "Invest in energy efficiency upgrades (LEDs, HVAC) & renewable energy sourcing (solar panels).",
                 "Prioritize sustainable procurement (reusable items, less toxic materials, local sourcing).",
                 "Implement robust waste segregation, recycling, & reprocessing programs.",
                 "Build climate resilience (backup power, flood protection) into facility planning." ]
            }
        }
    },
    // == EDUCATION ==
     "education": {
        "title": "Education Sector",
        "roles": {
             "teacher_k12": { "title": "Teacher (K-12)", "duties": [
                    "Integrate climate change education across subjects using age-appropriate methods (science, social studies, arts).",
                    "Facilitate project-based learning focused on local environmental issues & solutions.",
                    "Organize & support student eco-clubs, waste audits, school gardens, energy saving campaigns.",
                    "Model sustainable practices in the classroom (reduce waste, reuse materials, conserve energy/water).",
                    "Foster critical thinking about consumption, media literacy regarding climate news, and environmental justice.",
                    "Utilize outdoor learning opportunities to connect students with nature." ]
            },
             "professor_uni": { "title": "Professor/University Educator", "duties": [
                    "Conduct & publish research on climate science, impacts, mitigation, adaptation, policy, or justice.",
                    "Develop & teach specialized courses on climate change & sustainability.",
                    "Integrate climate change perspectives into existing courses across diverse disciplines.",
                    "Mentor students pursuing climate-related research, careers, or activism.",
                    "Advocate for institutional climate action (divestment from fossil fuels, carbon neutrality goals, curriculum reform).",
                    "Engage in public outreach & expert advice to policymakers or community groups." ]
             },
             "counselor_edu": { "title": "School/Career Counselor", "duties": [
                    "Provide resources & support for students experiencing climate anxiety or grief.",
                    "Guide students interested in 'green careers' and sustainability-focused further education.",
                    "Help students develop coping strategies for climate-related stressors & uncertainty.",
                    "Collaborate with teachers to integrate well-being & resilience into climate education.",
                    "Promote participation in environmental clubs/activities for positive engagement." ]
             },
             "edu_admin_edu": { "title": "Educational Administrator", "duties": [ /* Renamed */
                    "Develop & implement school/university sustainability plans (operations, procurement, investments).",
                    "Allocate budget & resources for climate education initiatives & campus sustainability projects.",
                    "Support professional development for faculty/staff on teaching climate change effectively.",
                    "Set targets for reducing campus emissions, waste, and water usage.",
                    "Oversee integration of climate change & sustainability into curriculum frameworks." ]
            }
        }
    },
    // == BUSINESS & FINANCE ==
     "business_finance": {
        "title": "Business & Finance",
        "roles": {
            "accountant": { "title": "Accountant", "duties": [
                    "Integrate climate-related risks & opportunities into financial reporting & risk assessments.",
                    "Track & report on sustainability metrics (e.g., GHG emissions, energy use) - familiarity with ESG standards.",
                    "Advise clients/companies on carbon accounting methodologies & potential carbon pricing impacts.",
                    "Support audits of environmental data & sustainability reports.",
                    "Identify opportunities for cost savings through resource efficiency." ]
            },
            "financial_analyst": { "title": "Financial Analyst", "duties": [
                    "Analyze & incorporate climate risks (physical & transition risks) into investment analysis & valuations.",
                    "Evaluate companies based on Environmental, Social, Governance (ESG) performance.",
                    "Identify investment opportunities in renewable energy, climate tech, & sustainable industries.",
                    "Model financial impacts of climate policies (carbon taxes, regulations) on companies/sectors.",
                    "Advise clients on aligning portfolios with climate goals (e.g., fossil fuel divestment)." ]
            },
            "business_manager": { "title": "Business Manager/Operations", "duties": [
                    "Develop & implement strategies to reduce operational emissions (energy efficiency, waste reduction).",
                    "Analyze & improve supply chain sustainability (supplier emissions, logistics).",
                    "Set & track progress towards corporate sustainability targets.",
                    "Explore circular economy models for products/services.",
                    "Foster a culture of sustainability within the organization." ]
            },
            "marketing_manager": { "title": "Marketing Manager", "duties": [
                    "Promote sustainable products/services accurately & transparently, avoiding greenwashing.",
                    "Develop marketing campaigns that highlight environmental benefits & actions.",
                    "Choose sustainable marketing materials & digital practices (e.g., green web hosting).",
                    "Gather customer insights on sustainability preferences to inform product development.",
                    "Ensure advertising standards related to environmental claims are met." ]
            },
            "sales_professional": { "title": "Sales Professional", "duties": [
                    "Understand & articulate the sustainability features & benefits of products/services.",
                    "Identify & target customers with strong sustainability mandates.",
                    "Provide feedback to product teams on customer demand for greener options.",
                    "Optimize travel schedules for efficiency; utilize virtual meetings where possible.",
                    "Build long-term relationships based on trust & transparent sustainability communication." ]
            }
        }
    },
    // == TECHNOLOGY & ENGINEERING ==
    "technology_engineering": { // Renamed category key slightly
         "title": "Technology & Engineering",
         "roles": {
             // software_dev role already exists, keep or merge if desired. Assuming keeping distinct for now.
             "software_engineer": { "title": "Software Engineer", "duties": [ /* Renamed key */
                 "Design & implement energy-efficient algorithms & data structures.",
                 "Optimize code for performance to reduce CPU cycles & server load (Green Coding).",
                 "Minimize data transfer size & frequency (network efficiency).",
                 "Develop features enabling eco-modes or sustainable choices for users.",
                 "Select energy-efficient infrastructure (cloud regions/providers using renewables)." ]
            },
            "data_scientist_tech": { "title": "Data Scientist", "duties": [ /* Renamed key */
                 "Build models to optimize resource use (energy grids, logistics, water systems).",
                 "Analyze large datasets to identify climate patterns, risks, & impacts.",
                 "Develop predictive models for renewable energy generation or climate events.",
                 "Optimize machine learning model training & inference for energy efficiency.",
                 "Visualize complex climate data clearly for diverse audiences." ]
            },
            "engineer_civil": {"title": "Civil Engineer", "duties": [
                    "Design infrastructure resilient to climate impacts (floods, heat, sea level rise).",
                    "Incorporate low-carbon materials (sustainable concrete mixes, timber, recycled content).",
                    "Optimize designs for material efficiency.",
                    "Implement sustainable water management (permeable pavements, bioswales, water reuse).",
                    "Conduct Life Cycle Assessments (LCAs) for infrastructure projects."]
            },
            "engineer_mechanical": {"title": "Mechanical Engineer", "duties": [
                    "Design energy-efficient machinery, HVAC systems, & industrial processes.",
                    "Develop & integrate renewable energy technologies (turbines, solar thermal).",
                    "Improve efficiency of transportation systems (vehicle design, engines).",
                    "Select materials based on lifecycle environmental impact & recyclability.",
                    "Optimize designs for durability, repairability, & longevity."]
            },
             "engineer_electrical": {"title": "Electrical Engineer", "duties": [
                     "Design & implement smart grid technologies for better renewable integration & efficiency.",
                     "Develop energy-efficient power electronics, motors, & lighting systems.",
                     "Optimize design of renewable energy generation & storage systems (solar PV, batteries).",
                     "Improve energy efficiency in consumer electronics & appliances.",
                     "Work on electrification of transportation & industry."]
             },
            "architect_tech": { "title": "Architect", "duties": [ /* Renamed key */
                 "Prioritize passive design (orientation, daylighting, natural ventilation, shading).",
                 "Design high-performance building envelopes (insulation, air tightness).",
                 "Specify low-embodied carbon materials (mass timber, recycled/reused materials).",
                 "Integrate renewable energy & water harvesting systems.",
                 "Design for adaptability, climate resilience, & eventual deconstruction/reuse." ]
             },
             "web_developer": { "title": "Web Developer", "duties": [
                 "Optimize website performance (image compression, efficient code, caching) to reduce energy use.",
                 "Minimize page weight & data transfer.",
                 "Choose green web hosting providers powered by renewable energy.",
                 "Implement efficient front-end & back-end architectures.",
                 "Promote accessibility, which often correlates with performance & lower resource use." ]
            }
        }
     },
     // == LAW & LEGAL ==
    "law_legal": {
        "title": "Law & Legal Services",
        "roles": {
            "lawyer": { "title": "Lawyer/Attorney", "duties": [
                    "Advise clients on environmental regulations, climate policies, & compliance.",
                    "Represent clients in climate litigation (holding polluters accountable or defending climate policies).",
                    "Draft contracts & agreements incorporating sustainability clauses & climate considerations.",
                    "Specialize in environmental law, energy law, or climate policy.",
                    "Provide pro-bono services to environmental NGOs or climate-impacted communities." ]
            },
            "judge": { "title": "Judge", "duties": [
                    "Preside fairly over environmental & climate-related cases based on law & evidence.",
                    "Stay informed on the evolving science & legal principles related to climate change.",
                    "Ensure access to justice for environmental claims.",
                    "Interpret regulations considering environmental protection goals where applicable.",
                    "Contribute to judicial education on climate law." ] // Primarily indirect influence
            },
            "legal_assistant_paralegal": { "title": "Legal Assistant/Paralegal", "duties": [
                    "Support lawyers working on environmental or climate cases with research & document preparation.",
                    "Help manage case files efficiently, utilizing digital workflows to reduce paper use.",
                    "Stay updated on relevant environmental regulations & legal precedents.",
                    "Assist in preparing filings related to climate disclosures or compliance.",
                    "Promote sustainable practices within the law firm (recycling, energy saving)." ]
            }
        }
    },
    // == HUMAN RESOURCES ==
     "human_resources": {
        "title": "Human Resources",
        "roles": {
             "hr_manager": { "title": "HR Manager", "duties": [
                    "Develop & implement sustainable workplace policies (remote work options, green commuting incentives).",
                    "Integrate sustainability into employer branding & recruitment to attract eco-conscious talent.",
                    "Organize employee training & engagement programs on sustainability.",
                    "Incorporate sustainability metrics into performance management where relevant.",
                    "Ensure fair labor practices throughout the supply chain (part of the 'S' in ESG)." ]
             },
             "recruiter": { "title": "Recruiter", "duties": [
                    "Actively source candidates with skills & experience in sustainability & green industries.",
                    "Highlight the company's sustainability initiatives & values to potential hires.",
                    "Partner with hiring managers to define roles supporting sustainability goals.",
                    "Utilize virtual interviewing techniques to reduce travel emissions.",
                    "Build talent pipelines for future green jobs." ]
            },
             "hr_generalist": { "title": "HR Generalist", "duties": [
                    "Administer green employee benefit programs (transit passes, bike-to-work schemes).",
                    "Support implementation of sustainable office practices (recycling programs, energy challenges).",
                    "Include sustainability awareness in employee onboarding processes.",
                    "Handle employee relations issues related to workplace sustainability policies.",
                    "Collect & analyze data on employee commuting patterns or engagement in green initiatives." ]
            }
        }
     },
     // == ARTS & CREATIVE FIELDS ==
     "arts_creative": {
         "title": "Arts & Creative Fields",
         "roles": {
            "artist_visual": { "title": "Artist (Visual)", "duties": [
                    "Create artwork that explores climate themes, raises awareness, or inspires action.",
                    "Choose sustainable & non-toxic materials & processes (natural pigments, recycled materials, minimizing solvents).",
                    "Reduce waste in the studio practice.",
                    "Consider the energy footprint of digital art creation & exhibition.",
                    "Use exhibitions & platforms to engage audiences on environmental issues." ]
            },
             "designer_graphic": { "title": "Designer (Graphic/Digital)", "duties": [
                     "Design communication materials that effectively convey climate information.",
                     "Optimize digital assets (web images, PDFs) for smaller file sizes to reduce energy consumption.",
                     "Advise clients on sustainable printing options (recycled paper, vegetable inks, minimizing print runs).",
                     "Prioritize accessibility in digital design, which often improves efficiency.",
                     "Design for longevity & clarity, reducing the need for frequent redesigns." ]
             },
             "designer_fashion": { "title": "Designer (Fashion)", "duties": [
                    "Source sustainable materials (organic cotton, recycled fabrics, innovative low-impact textiles).",
                    "Design for durability, repairability, & timelessness (slow fashion).",
                    "Minimize textile waste during pattern cutting & production (zero-waste design).",
                    "Explore natural & less resource-intensive dyeing processes.",
                    "Promote transparency in the supply chain regarding environmental & ethical practices." ]
            },
             "musician": { "title": "Musician", "duties": [
                    "Write & perform music that addresses environmental themes & inspires change.",
                    "Reduce the environmental impact of touring (efficient travel, green riders for venues).",
                    "Choose sustainable options for merchandise production.",
                    "Use their platform to advocate for climate action & support environmental causes.",
                    "Collaborate on projects raising climate awareness (e.g., benefit concerts)." ]
             },
            "writer_author_journalist": { "title": "Writer/Author/Journalist", "duties": [ /* Combined some */
                    "Report accurately & compellingly on climate science, impacts, solutions, & policy.",
                    "Investigate & expose environmental injustices or corporate greenwashing.",
                    "Craft narratives (fiction/non-fiction) that explore human dimensions of climate change.",
                    "Translate complex climate information for broader public understanding.",
                    "Hold leaders & institutions accountable through informed questioning & reporting." ]
            }
        }
     },
    // == PUBLIC SERVICE & GOVERNMENT ==
    "public_service": {
         "title": "Public Service & Government",
         "roles": {
             "police_officer": { "title": "Police Officer", "duties": [
                    "Participate in community resilience efforts & disaster response planning for climate events.",
                    "Enforce environmental regulations related to illegal dumping, pollution, or wildlife protection where applicable.",
                    "Support initiatives for fuel-efficient police vehicles & optimized patrol routes.",
                    "Engage positively with community members on environmental safety issues.",
                    "Receive training on recognizing climate-related risks (e.g., identifying heat stroke signs)." ] // Influence is mainly operational & community-facing
             },
             "firefighter": { "title": "Firefighter", "duties": [
                     "Respond to increasing frequency/intensity of wildfires & climate-related disasters.",
                     "Participate in community education on fire prevention & safety, especially in wildland-urban interface.",
                     "Support sustainable practices at the fire station (energy/water conservation, waste reduction).",
                     "Receive training on health risks associated with wildfire smoke & extreme heat.",
                     "Advocate for resources needed to address climate-driven fire risks." ]
            },
            "social_worker": { "title": "Social Worker", "duties": [
                     "Support individuals & communities disproportionately affected by climate change impacts (vulnerable populations).",
                     "Assist clients in accessing resources related to climate adaptation (cooling centers, disaster aid).",
                     "Address mental health impacts (eco-anxiety, trauma) linked to climate change.",
                     "Advocate for policies that integrate social equity & climate justice.",
                     "Help build community resilience networks." ]
             },
             "politician_policymaker": { "title": "Politician/Policy Maker", "duties": [
                     "Develop, enact, & implement ambitious climate mitigation & adaptation policies.",
                     "Set legally binding emission reduction targets aligned with climate science (1.5°C).",
                     "Allocate public funding towards renewable energy, green infrastructure, & climate resilience.",
                     "Engage in international climate negotiations & cooperation.",
                     "Ensure a just transition for workers & communities affected by the shift away from fossil fuels." ] // High-level influence
            }
         }
    },
    // == OTHER DIVERSE ROLES ==
    "other_professions": {
         "title": "Other Professions",
         "roles": {
             "scientist_researcher": { "title": "Scientist/Researcher (Various Fields)", "duties": [
                    "Conduct fundamental & applied research to understand climate systems & impacts.",
                    "Develop innovative climate solutions (mitigation technologies, adaptation strategies).",
                    "Monitor environmental changes & provide data for climate models & assessments.",
                    "Communicate research findings effectively to policymakers & the public.",
                    "Make lab/fieldwork practices more sustainable (reduce energy/waste)." ]
             },
            // Journalist covered under Arts/Creative
            "project_manager": { "title": "Project Manager", "duties": [
                     "Integrate sustainability goals & climate considerations into project planning & execution.",
                     "Track environmental performance metrics alongside budget & schedule.",
                     "Prioritize vendors & materials with lower environmental footprints.",
                     "Identify & manage climate-related risks within projects.",
                     "Facilitate communication on sustainability aspects among project stakeholders." ]
             }
            // Add more roles as needed
         }
    }
};


// --- Contributors Data ---
// (Same as provided in previous response - ensure images exist or placeholders work)
const contributors = [
    { name: "Greta Thunberg", image: "images/contributor-photos/greta.jpg", description: "Swedish activist demanding urgent climate action through school strikes and global advocacy.", link: "https://fridaysforfuture.org/" },
    { name: "Sunita Narain", image: "images/contributor-photos/sunita.jpg", description: "Indian environmentalist (CSE), advocating for environmental justice and sustainable development.", link: "https://www.cseindia.org/" },
    { name: "Dr. Vandana Shiva", image: "images/contributor-photos/vandana.jpg", description: "Indian scholar & activist focusing on biodiversity, conservation, and food sovereignty.", link: "https://navdanya.org/" },
    { name: "Sir David Attenborough", image: "images/contributor-photos/attenborough.jpg", description: "Renowned broadcaster highlighting climate impacts on biodiversity and the planet.", link: "https://www.attenboroughfilm.com/" },
    { name: "Rajendra Singh", image: "images/contributor-photos/rajendra.jpg", description: "'Waterman of India', revived traditional rainwater harvesting structures in Rajasthan.", link: "https://tarunbharatsangh.in/" } // Example link
];

// --- Calculator Emission Factors ---
// (Same example/placeholder factors as provided previously - REMINDER: REPLACE WITH ACCURATE DATA)
const emissionFactors = {
    'IN': {
        name: "India", currency: '₹', distanceUnit: 'km', distanceUnitShort: 'km', volumeUnit: 'litres', avgFootprint: 1.9,
        electricity_grid_intensity: 0.71, natural_gas_kwh: 0.20, natural_gas_m3: 2.05, heating_oil_litre: 2.96, coal_tonne: 2850, lpg_litre: 1.55, propane_litre: 1.51, wood_pellets_tonne: 50,
        flight_domestic_km_factor: 0.26, flight_short_km_factor: 0.19, flight_long_km_factor: 0.16, flight_typical_dist_domestic_km: 600, flight_typical_dist_short_km: 1800, flight_typical_dist_long_km: 7000,
        car_petrol_km: 0.19, car_diesel_km: 0.18, car_hybrid_km: 0.12, car_lpg_km: 0.16, car_cng_km: 0.15, car_electric_kwh_km: 0.16,
        motorbike_small_km: 0.08, motorbike_medium_km: 0.11, motorbike_large_km: 0.15,
        pt_bus_km: 0.10, pt_coach_km: 0.04, pt_train_local_km: 0.05, pt_train_long_km: 0.03, pt_tram_subway_km: 0.02, pt_taxi_km: 0.16,
        secondary_factors: { food_average: 0.030, food_heavy_meat: 0.050, food_medium_meat: 0.035, food_low_meat: 0.025, food_pescatarian: 0.022, food_vegetarian: 0.018, food_vegan: 0.015, clothing: 0.025, pharmaceuticals: 0.020, paper: 0.015, electronics: 0.035, appliances: 0.030, furniture: 0.028, vehicles: 0.040, hotels: 0.022, telecom: 0.010, finance: 0.008, recreation: 0.018 }
    },
    'US': {
        name: "United States", currency: '$', distanceUnit: 'miles', distanceUnitShort: 'miles', volumeUnit: 'gallons_us', avgFootprint: 14.7,
        electricity_grid_intensity: 0.37, natural_gas_kwh: 0.18, natural_gas_therms: 5.31, heating_oil_gallon_us: 10.21, coal_tonne: 2450, lpg_gallon_us: 5.68, propane_gallon_us: 5.74, wood_pellets_tonne: 45,
        flight_domestic_mi_factor: 0.40, flight_short_mi_factor: 0.29, flight_long_mi_factor: 0.24, flight_typical_dist_domestic_mi: 700, flight_typical_dist_short_mi: 1500, flight_typical_dist_long_mi: 4500,
        car_petrol_mi: 0.34, car_diesel_mi: 0.37, car_hybrid_mi: 0.21, car_lpg_mi: 0.29, car_cng_mi: 0.27, car_electric_kwh_mi: 0.32,
        motorbike_small_mi: 0.13, motorbike_medium_mi: 0.18, motorbike_large_mi: 0.24,
        pt_bus_mi: 0.18, pt_coach_mi: 0.07, pt_train_local_mi: 0.15, pt_train_long_mi: 0.10, pt_tram_subway_mi: 0.06, pt_taxi_mi: 0.25,
        secondary_factors: { food_average: 0.008, food_heavy_meat: 0.012, food_medium_meat: 0.009, food_low_meat: 0.007, food_pescatarian: 0.006, food_vegetarian: 0.005, food_vegan: 0.004, clothing: 0.007, pharmaceuticals: 0.005, paper: 0.004, electronics: 0.010, appliances: 0.009, furniture: 0.008, vehicles: 0.011, hotels: 0.006, telecom: 0.003, finance: 0.002, recreation: 0.005 }
    },
    'GB': {
        name: "United Kingdom", currency: '£', distanceUnit: 'miles', distanceUnitShort: 'miles', volumeUnit: 'litres', avgFootprint: 8.5,
        electricity_grid_intensity: 0.19, natural_gas_kwh: 0.184, natural_gas_m3: 2.03, heating_oil_litre: 2.52, heating_oil_gallon_uk: 11.45, coal_tonne: 2650, lpg_litre: 1.51, propane_litre: 1.51, wood_pellets_tonne: 35,
        flight_domestic_mi_factor: 0.41, flight_short_mi_factor: 0.21, flight_long_mi_factor: 0.18, flight_typical_dist_domestic_mi: 250, flight_typical_dist_short_mi: 800, flight_typical_dist_long_mi: 5000,
        car_petrol_mi: 0.27, car_diesel_mi: 0.26, car_hybrid_mi: 0.19, car_lpg_mi: 0.22, car_cng_mi: 0.21, car_electric_kwh_mi: 0.28,
        motorbike_small_mi: 0.12, motorbike_medium_mi: 0.15, motorbike_large_mi: 0.20,
        pt_bus_mi: 0.16, pt_coach_mi: 0.05, pt_train_local_mi: 0.06, pt_train_long_mi: 0.055, pt_tram_subway_mi: 0.04, pt_taxi_mi: 0.21,
        secondary_factors: { food_average: 0.010, food_heavy_meat: 0.015, food_medium_meat: 0.011, food_low_meat: 0.009, food_pescatarian: 0.008, food_vegetarian: 0.007, food_vegan: 0.006, clothing: 0.008, pharmaceuticals: 0.006, paper: 0.005, electronics: 0.012, appliances: 0.010, furniture: 0.009, vehicles: 0.013, hotels: 0.007, telecom: 0.004, finance: 0.003, recreation: 0.006 }
    }
};

// --- Helper Function ---
function getCurrentFactors(countryCode = 'IN') {
     const factors = emissionFactors[countryCode];
     if (factors) { return factors; }
     else { console.warn(`Emission factors missing for: ${countryCode}. Using 'IN' fallback.`); return emissionFactors['IN']; }
}

// --- Unit Conversions ---
 const unitConversions = {
    miles_to_km: 1.60934, km_to_miles: 0.621371,
    gallons_us_to_litres: 3.78541, litres_to_gallons_us: 0.264172,
    gallons_uk_to_litres: 4.54609, litres_to_gallons_uk: 0.219969,
    therms_to_kwh: 29.3071, m3_natgas_to_kwh: 10.55, // Approx
    lpg_kg_to_litres: 1.96, // Approx
 };