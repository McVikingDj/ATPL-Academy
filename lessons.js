window.ATPL_LESSONS = {
  airLaw: {
    title: "Air Law",
    accent: "#39a7ff",
    lessons: [
      {
        id: "air-law-vfr-minima",
        title: "VFR Visibility Minima",
        explanation: "VFR flight depends on staying clear of cloud and keeping enough visibility to see traffic, terrain, and navigation references.",
        relevance: "ATPL exams often test how airspace class, altitude, and speed affect minimum visibility and cloud clearance.",
        example: "Below 3,000 ft AMSL in some controlled airspace, lower visibility may be allowed at reduced speed, but the exact rule depends on the airspace and operation.",
        question: "Why do VFR minima change with airspace and altitude?",
        options: ["Traffic density and separation needs change", "Aircraft altimeters become less accurate", "Radio navigation stops working", "Clouds always become colder"],
        correctIndex: 0,
        quizExplanation: "The minima are designed around see-and-avoid, separation, and operational risk in different airspace environments."
      },
      {
        id: "air-law-altimeter-setting",
        title: "Altimeter Setting Regions",
        explanation: "Pilots use QNH near terrain and transition to standard pressure when operating at flight levels.",
        relevance: "Correct pressure setting prevents vertical separation errors, especially around transition altitude and transition level.",
        example: "After climbing through transition altitude, a pilot sets 1013.25 hPa and reports flight level instead of altitude.",
        question: "What pressure setting is normally used for flight levels?",
        options: ["1013.25 hPa", "Local QFE", "Destination QNH", "Cabin pressure"],
        correctIndex: 0,
        quizExplanation: "Flight levels use the standard pressure setting, 1013.25 hPa, so aircraft share the same vertical reference."
      },
      {
        id: "air-law-right-of-way",
        title: "Right-of-way Basics",
        explanation: "Right-of-way rules create predictable avoidance behavior when aircraft meet or converge.",
        relevance: "ATPL candidates must know priority between powered aircraft, gliders, balloons, aircraft in distress, and landing traffic.",
        example: "When two powered aircraft approach head-on, both alter course to the right.",
        question: "In a head-on encounter between two powered aircraft, what should each pilot do?",
        options: ["Alter course to the right", "Climb immediately", "Turn left if faster", "Maintain heading until instructed"],
        correctIndex: 0,
        quizExplanation: "The standard rule is that both aircraft alter course to the right to create predictable separation."
      }
    ]
  },
  operationalProcedures: {
    title: "Operational Procedures",
    accent: "#19c37d",
    lessons: [
      {
        id: "ops-contaminated-runway",
        title: "Contaminated Runway Awareness",
        explanation: "A runway is contaminated when surface deposits such as water, slush, snow, or ice significantly affect braking and control.",
        relevance: "Performance calculations, landing distance factors, and rejected takeoff decisions all depend on surface condition.",
        example: "Standing water can reduce braking action and increase the landing distance required.",
        question: "What is the main operational concern on a contaminated runway?",
        options: ["Reduced braking and directional control", "Higher indicated airspeed", "Lower pressure altitude", "Improved tyre cooling"],
        correctIndex: 0,
        quizExplanation: "Contamination reduces friction, which can lengthen stopping distance and make directional control harder."
      },
      {
        id: "ops-fuel-policy",
        title: "Fuel Policy Building Blocks",
        explanation: "Operational fuel planning includes trip fuel, contingency fuel, alternate fuel where needed, final reserve, and any additional fuel.",
        relevance: "ATPL exams often ask candidates to identify which fuel component covers which phase or risk.",
        example: "Final reserve fuel protects the aircraft during the final holding period near destination or alternate.",
        question: "Which fuel protects against expected trip calculation uncertainty?",
        options: ["Contingency fuel", "Taxi fuel", "Final reserve fuel", "Unusable fuel"],
        correctIndex: 0,
        quizExplanation: "Contingency fuel covers variations from the planned trip fuel, such as wind or routing differences."
      },
      {
        id: "ops-wake-turbulence",
        title: "Wake Turbulence Spacing",
        explanation: "Wingtip vortices are strongest behind heavy aircraft and can persist near the runway path.",
        relevance: "Separation categories and runway departure timing are core operational procedure topics.",
        example: "A light aircraft departing after a heavy aircraft may need extra spacing or an earlier rotation point.",
        question: "Where is wake turbulence generally strongest?",
        options: ["Behind heavy aircraft at low speed and high lift", "Ahead of fast aircraft in cruise", "Only above the tropopause", "Only from aircraft with swept wings"],
        correctIndex: 0,
        quizExplanation: "High lift and high weight generate strong vortices, especially during takeoff and landing."
      }
    ]
  },
  humanPerformance: {
    title: "Human Performance",
    accent: "#ffb020",
    lessons: [
      {
        id: "hp-hypoxia",
        title: "Hypoxia Recognition",
        explanation: "Hypoxia is a shortage of oxygen available to body tissues and can reduce judgment before the pilot notices obvious symptoms.",
        relevance: "ATPL Human Performance questions focus on symptoms, time of useful consciousness, and mitigation.",
        example: "At high altitude, a pilot may feel euphoric while decision-making is already impaired.",
        question: "Which action is the immediate priority when hypoxia is suspected?",
        options: ["Use oxygen and descend if needed", "Drink water", "Dim cockpit lights", "Increase cabin temperature"],
        correctIndex: 0,
        quizExplanation: "Restoring oxygen and reducing altitude exposure are the key immediate defenses."
      },
      {
        id: "hp-threat-error",
        title: "Threat and Error Management",
        explanation: "Threat and Error Management helps crews identify external threats, trap errors, and avoid undesired aircraft states.",
        relevance: "Modern ATPL training expects pilots to apply human factors concepts, not just memorize definitions.",
        example: "A runway change during descent is a threat; a rushed briefing omission is an error to trap before approach.",
        question: "What is an undesired aircraft state?",
        options: ["A condition that reduces safety margins", "A normal checklist item", "A weather forecast code", "A regulatory exemption"],
        correctIndex: 0,
        quizExplanation: "An undesired aircraft state is a position, speed, configuration, or situation that has degraded safety margins."
      },
      {
        id: "hp-fatigue",
        title: "Fatigue and Performance",
        explanation: "Fatigue reduces attention, reaction time, memory, communication quality, and risk assessment.",
        relevance: "Flight time limitations and crew rest rules exist because fatigue is a predictable operational hazard.",
        example: "A circadian low during an early morning sector can increase monitoring errors.",
        question: "Which performance area is commonly affected by fatigue?",
        options: ["Reaction time and attention", "Magnetic variation", "Wing loading", "Static pressure"],
        correctIndex: 0,
        quizExplanation: "Fatigue primarily affects cognitive and psychomotor performance, including attention and reaction time."
      }
    ]
  },
  meteorology: {
    title: "Meteorology",
    accent: "#6c8cff",
    lessons: [
      {
        id: "met-isa-lapse-rate",
        title: "ISA Temperature Lapse Rate",
        explanation: "In the International Standard Atmosphere, temperature decreases with height in the troposphere at about 2 degrees Celsius per 1,000 ft.",
        relevance: "ISA deviation affects aircraft performance, pressure altitude, and density altitude calculations.",
        example: "At 5,000 ft ISA, temperature is approximately 5 degrees Celsius because sea-level ISA is 15 degrees Celsius.",
        question: "What is the standard ISA temperature lapse rate in the troposphere?",
        options: ["2 degrees Celsius per 1,000 ft", "1 degree Celsius per 1,000 ft", "3 degrees Celsius per 100 ft", "No change with altitude"],
        correctIndex: 0,
        quizExplanation: "The common ATPL working value is 2 degrees Celsius per 1,000 ft in the troposphere."
      },
      {
        id: "met-fronts",
        title: "Cold Front Weather",
        explanation: "Cold fronts can lift warm air rapidly, producing cumuliform cloud, showers, turbulence, and possible thunderstorms.",
        relevance: "Recognizing frontal weather helps with route planning and interpreting forecasts and charts.",
        example: "A marked cold front may bring a narrow band of heavy showers followed by clearer, colder air.",
        question: "What cloud type is commonly linked to active cold fronts?",
        options: ["Cumulonimbus", "Cirrostratus only", "Radiation fog", "Altostratus with no turbulence"],
        correctIndex: 0,
        quizExplanation: "Rapid uplift at active cold fronts can generate cumulonimbus and convective weather."
      },
      {
        id: "met-qnh-pressure",
        title: "QNH and Elevation",
        explanation: "QNH is the pressure setting that makes an altimeter read aerodrome elevation when on the ground.",
        relevance: "Pressure setting errors are a recurring ATPL topic because they affect terrain clearance.",
        example: "If airport elevation is 350 ft, the altimeter should show about 350 ft when set to local QNH on the apron.",
        question: "What should an altimeter read on the ground when set to local QNH?",
        options: ["Aerodrome elevation", "Zero height", "Pressure altitude", "Transition level"],
        correctIndex: 0,
        quizExplanation: "QNH references mean sea level pressure, so the altimeter reads aerodrome elevation on the ground."
      }
    ]
  },
  communications: {
    title: "Communications",
    accent: "#e85d75",
    lessons: [
      {
        id: "com-readback",
        title: "Readback Discipline",
        explanation: "Safety-critical clearances must be read back accurately so ATC can catch misunderstandings.",
        relevance: "ATPL communications tests focus on standard phraseology and mandatory readbacks.",
        example: "Runway, heading, level, speed, route, and transponder instructions usually require readback.",
        question: "Why are readbacks required for clearances?",
        options: ["To confirm the pilot understood the instruction", "To reserve radio frequency time", "To update the flight plan automatically", "To replace the clearance"],
        correctIndex: 0,
        quizExplanation: "Readback lets ATC verify that the pilot received and understood the clearance correctly."
      },
      {
        id: "com-pan-mayday",
        title: "MAYDAY and PAN PAN",
        explanation: "MAYDAY indicates grave and imminent danger; PAN PAN indicates urgency without immediate danger to life or aircraft.",
        relevance: "Correct urgency and distress calls are essential for operational communication questions.",
        example: "Engine failure in a single-engine aircraft is distress; a sick passenger may be urgency depending on severity.",
        question: "Which call indicates distress?",
        options: ["MAYDAY", "PAN PAN", "STANDBY", "WILCO"],
        correctIndex: 0,
        quizExplanation: "MAYDAY is used for distress situations involving grave and imminent danger."
      },
      {
        id: "com-phonetic",
        title: "ICAO Phonetic Alphabet",
        explanation: "The ICAO phonetic alphabet reduces ambiguity when spelling identifiers, callsigns, and waypoints.",
        relevance: "Clear transmission is tested in both communications theory and practical radio work.",
        example: "The registration G-ABCD is transmitted as Golf Alpha Bravo Charlie Delta.",
        question: "What is the ICAO word for the letter Q?",
        options: ["Quebec", "Queen", "Quick", "Quartz"],
        correctIndex: 0,
        quizExplanation: "Q is spoken as Quebec in the ICAO phonetic alphabet."
      }
    ]
  },
  principlesOfFlight: {
    title: "Principles of Flight",
    accent: "#9b72ff",
    lessons: [
      {
        id: "pof-angle-of-attack",
        title: "Angle of Attack",
        explanation: "Angle of attack is the angle between the chord line and the relative airflow.",
        relevance: "Stall, lift coefficient, and aircraft handling questions depend on this concept.",
        example: "An aircraft can stall at any airspeed if the critical angle of attack is exceeded.",
        question: "What directly causes an aerodynamic stall?",
        options: ["Exceeding critical angle of attack", "Flying below a fixed airspeed", "Reducing thrust to idle", "Flying in cold air"],
        correctIndex: 0,
        quizExplanation: "A stall occurs when the wing exceeds its critical angle of attack and airflow separates."
      },
      {
        id: "pof-induced-drag",
        title: "Induced Drag",
        explanation: "Induced drag is drag associated with lift production and is strongest at low speed and high angle of attack.",
        relevance: "Drag curves and best endurance or range speeds are common ATPL Principles of Flight topics.",
        example: "During slow flight, more lift coefficient is needed, so induced drag increases.",
        question: "When is induced drag generally highest?",
        options: ["Low speed, high lift condition", "High speed cruise", "During engine shutdown", "At zero angle of attack only"],
        correctIndex: 0,
        quizExplanation: "Induced drag rises when the wing must generate more lift coefficient, typically at low speed."
      },
      {
        id: "pof-load-factor",
        title: "Load Factor in Turns",
        explanation: "In a level turn, lift must support weight and provide centripetal force, so load factor increases with bank angle.",
        relevance: "Load factor affects stall speed and structural limits, both frequent exam areas.",
        example: "At 60 degrees of bank in level flight, load factor is about 2 g.",
        question: "What happens to stall speed as load factor increases?",
        options: ["It increases", "It decreases", "It becomes zero", "It equals ground speed"],
        correctIndex: 0,
        quizExplanation: "Higher load factor requires more lift, so the aircraft reaches critical angle of attack at a higher speed."
      }
    ]
  },
  instrumentation: {
    title: "Instrumentation",
    accent: "#00a6a6",
    lessons: [
      {
        id: "inst-pitot-static",
        title: "Pitot-Static System",
        explanation: "The pitot-static system supplies total and static pressure to instruments such as the airspeed indicator, altimeter, and VSI.",
        relevance: "ATPL instrumentation questions often test blockage effects and pressure source logic.",
        example: "A blocked static port can make altitude and vertical speed indications unreliable.",
        question: "Which instrument uses both pitot and static pressure?",
        options: ["Airspeed indicator", "Magnetic compass", "Turn coordinator", "Chronometer"],
        correctIndex: 0,
        quizExplanation: "The airspeed indicator compares pitot total pressure with static pressure."
      },
      {
        id: "inst-gyro-rigidity",
        title: "Gyroscopic Rigidity",
        explanation: "A spinning gyroscope tends to maintain its plane of rotation, creating a stable reference.",
        relevance: "Attitude and heading indicator behavior depends on gyroscopic principles and errors.",
        example: "An attitude indicator uses a gyro reference to show pitch and bank.",
        question: "What does gyroscopic rigidity provide?",
        options: ["A stable reference in space", "A direct measure of fuel flow", "A pressure altitude correction", "A radio bearing"],
        correctIndex: 0,
        quizExplanation: "Rigidity allows gyro instruments to maintain a stable reference despite aircraft movement."
      },
      {
        id: "inst-altimeter-errors",
        title: "Altimeter Temperature Error",
        explanation: "In colder-than-standard air, pressure levels are closer together and true altitude is lower than indicated.",
        relevance: "Terrain clearance and instrument approach minima require awareness of cold temperature effects.",
        example: "From high to low temperature, look out below is the practical memory aid.",
        question: "In very cold air, true altitude is generally:",
        options: ["Lower than indicated", "Higher than indicated", "Always equal to pressure altitude", "Unaffected below 10,000 ft"],
        correctIndex: 0,
        quizExplanation: "Cold air compresses pressure levels, so the aircraft is lower than the altimeter indicates."
      }
    ]
  },
  massAndBalance: {
    title: "Mass and Balance",
    accent: "#f97316",
    lessons: [
      {
        id: "mb-moment",
        title: "Mass, Arm, and Moment",
        explanation: "Moment is mass multiplied by arm. It describes the turning effect of a load around a reference datum.",
        relevance: "Center of gravity calculations are built from total moments divided by total mass.",
        example: "A 100 kg item at a 2 m arm creates a 200 kgm moment.",
        question: "How is moment calculated?",
        options: ["Mass times arm", "Arm divided by mass", "Mass plus fuel flow", "Datum times speed"],
        correctIndex: 0,
        quizExplanation: "Moment equals mass multiplied by arm, then CG is found from total moment divided by total mass."
      },
      {
        id: "mb-forward-cg",
        title: "Forward CG Effects",
        explanation: "A forward center of gravity increases stability but can require more tail-down force and higher control effort.",
        relevance: "ATPL exams link CG position to stability, control authority, and performance.",
        example: "A very forward CG may make rotation and flare more difficult.",
        question: "What is a typical effect of a forward CG?",
        options: ["Greater longitudinal stability", "Lower elevator force required", "Lower stall speed in all cases", "No effect on handling"],
        correctIndex: 0,
        quizExplanation: "Forward CG generally increases stability but can reduce controllability margins."
      },
      {
        id: "mb-zero-fuel-mass",
        title: "Zero Fuel Mass",
        explanation: "Zero fuel mass is aircraft mass including payload and unusable fuel, but excluding usable fuel.",
        relevance: "Structural limits protect the wing root from excessive bending loads before fuel is added.",
        example: "Payload may need limiting if planned zero fuel mass exceeds the certified maximum.",
        question: "Usable fuel is included in zero fuel mass.",
        options: ["False", "True", "Only taxi fuel", "Only reserve fuel"],
        correctIndex: 0,
        quizExplanation: "Zero fuel mass excludes usable fuel; it includes aircraft, crew, payload, and unusable fuel."
      }
    ]
  },
  performance: {
    title: "Performance",
    accent: "#2dd4bf",
    lessons: [
      {
        id: "perf-density-altitude",
        title: "Density Altitude",
        explanation: "Density altitude is pressure altitude corrected for non-standard temperature and indicates air density effects on performance.",
        relevance: "High density altitude reduces engine, propeller, wing, and climb performance.",
        example: "A hot day at a high-elevation airport can significantly increase takeoff distance.",
        question: "What happens to takeoff performance at high density altitude?",
        options: ["Takeoff distance increases", "Takeoff distance decreases", "Climb improves", "Stall angle changes to zero"],
        correctIndex: 0,
        quizExplanation: "Less dense air reduces lift and thrust, so acceleration and climb performance decrease."
      },
      {
        id: "perf-balanced-field",
        title: "Balanced Field Concept",
        explanation: "Balanced field length is where accelerate-stop distance equals accelerate-go distance for a given condition.",
        relevance: "Multi-engine performance questions often use V1 and balanced field ideas.",
        example: "Changing runway slope, wind, or mass can alter the balanced field calculation.",
        question: "Balanced field length compares which two distances?",
        options: ["Accelerate-stop and accelerate-go", "Taxi-out and taxi-in", "Climb and descent", "Trip and alternate"],
        correctIndex: 0,
        quizExplanation: "The balanced field is where stopping after failure and continuing after failure require the same distance."
      },
      {
        id: "perf-v-speeds",
        title: "Key Takeoff V-speeds",
        explanation: "V1, VR, and V2 guide decision, rotation, and initial climb safety in takeoff performance.",
        relevance: "Knowing each speed's role is essential for performance calculations and operational limits.",
        example: "At VR, the pilot initiates rotation to lift off safely and achieve the required climb path.",
        question: "Which speed is associated with initiating rotation?",
        options: ["VR", "V1", "V2", "VMO"],
        correctIndex: 0,
        quizExplanation: "VR is rotation speed; V1 is decision speed and V2 is takeoff safety speed."
      }
    ]
  },
  flightPlanning: {
    title: "Flight Planning and Monitoring",
    accent: "#64748b",
    lessons: [
      {
        id: "fpm-trip-fuel",
        title: "Trip Fuel",
        explanation: "Trip fuel is the planned fuel from takeoff to landing at the destination, based on route, levels, winds, and procedures.",
        relevance: "Fuel planning questions often require separating trip fuel from contingency, alternate, and reserve components.",
        example: "Taxi fuel is burned before takeoff and is not part of airborne trip fuel.",
        question: "Trip fuel normally covers which part of the flight?",
        options: ["Takeoff to destination landing", "Engine start to takeoff only", "Holding after missed approach only", "Destination parking to shutdown"],
        correctIndex: 0,
        quizExplanation: "Trip fuel covers the airborne route from takeoff to landing at destination."
      },
      {
        id: "fpm-wind-correction",
        title: "Wind Correction Angle",
        explanation: "Wind correction angle is the heading adjustment used to maintain the desired track in crosswind.",
        relevance: "Navigation logs and monitoring require comparing planned track, heading, groundspeed, and drift.",
        example: "With wind from the right, the pilot often steers right of track to prevent left drift.",
        question: "What does wind correction angle correct?",
        options: ["Drift from crosswind", "Altimeter lag", "Magnetic dip", "Fuel temperature"],
        correctIndex: 0,
        quizExplanation: "Wind correction angle offsets drift so the aircraft follows the intended ground track."
      },
      {
        id: "fpm-point-of-no-return",
        title: "Point of No Return",
        explanation: "The point of no return is the point beyond which continuing is more practical than returning, based on fuel and groundspeed.",
        relevance: "ATPL flight planning includes critical point and point of no return calculations.",
        example: "Different outbound and homebound winds move the point of no return away from the midpoint.",
        question: "What strongly affects point of no return position?",
        options: ["Outbound and return groundspeeds", "Cabin lighting", "VHF channel spacing", "Compass card color"],
        correctIndex: 0,
        quizExplanation: "Groundspeed in each direction changes time and fuel needed to continue or return."
      }
    ]
  },
  generalNavigation: {
    title: "General Navigation",
    accent: "#0ea5e9",
    lessons: [
      {
        id: "nav-great-circle",
        title: "Great Circle Tracks",
        explanation: "A great circle is the shortest path over the Earth's surface between two points.",
        relevance: "Long-range navigation questions often compare great circles, rhumb lines, and chart projections.",
        example: "On a polar route, the great circle track direction changes continuously.",
        question: "What is a great circle route?",
        options: ["The shortest surface path between two points", "A constant true heading route", "A line crossing meridians at 90 degrees", "A pressure-pattern route"],
        correctIndex: 0,
        quizExplanation: "A great circle is the shortest route on a spherical surface, although its track may change."
      },
      {
        id: "nav-rhumb-line",
        title: "Rhumb Lines",
        explanation: "A rhumb line crosses all meridians at the same angle, giving a constant true track.",
        relevance: "Mercator chart work relies heavily on rhumb line properties.",
        example: "A straight line on a Mercator chart represents a rhumb line.",
        question: "What is the key property of a rhumb line?",
        options: ["Constant track angle", "Shortest route always", "Zero wind drift", "Constant altitude"],
        correctIndex: 0,
        quizExplanation: "A rhumb line maintains a constant angle with meridians, so it has constant true track."
      },
      {
        id: "nav-magnetic-variation",
        title: "Magnetic Variation",
        explanation: "Magnetic variation is the angle between true north and magnetic north at a location.",
        relevance: "Converting true course to magnetic heading is a core navigation calculation.",
        example: "With 5 degrees east variation, true to magnetic is commonly remembered as east is least.",
        question: "Magnetic variation is the angle between:",
        options: ["True north and magnetic north", "Heading and drift", "Latitude and longitude", "QNH and QFE"],
        correctIndex: 0,
        quizExplanation: "Variation describes the difference between true and magnetic north at a specific location."
      }
    ]
  }
};
