import formsCatalog from './FormsCatalog'
import Steps from './Steps';

const Natures = [
    {
        text: "Aligneuse de pierres",
        value: "aligneuse",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: [] // ex. ['tires'] (used by NewEvaluation.js)
            },
            3: {
                addOns: ["usureGenerale","largeurTravailMetres","typeAligneusePierres","attelageOutil","repliageChassis","nombrePoutres","sectionPoutre","usureSocs","typeReglageAngle","miseAuTransport","commandesHydrauliques","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite"]
            },
            4:{
                type:'trailed',
                addOns:[]
            }
        }
    },
    {
        text: "Andaineur",
        value: "rake",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3: {
                addOns: ["usureGenerale","largeurTravailMetres","attelageOutil","nombreRotors","nombreDentsARemplacer","miseEnAndain","suiviSol","essieuPrincipal","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsAndaineur","conformite"]
            },
            4:{
                type:'trailed',
                addOns: ["bras", "toile"]
            }
        }
    },
    {
        text: "Autochargeuse",
        value: "silageTrailer",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","capaciteEnM3","chargeUtile","largeurPickUp","nombreDentsARemplacer","nombreCouteaux","dechargementRemorque","usureChaines","attelageRemorque","suspensionFleche","typeEssieuRemorque","sectionEssieu","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsAutochargeuse","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["pickUp","couteaux","interieurCaisse_1","interieurCaisse_2"]
            }
        }
    },
    {
        text: "Balayeuse",
        value: "sweeper",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","largeurTravailNumerique","entrainementOutil","attelageOutil","repliageChassis","commandesHydrauliques","typeReglageAngle","usureChassis","usureBalais","miseAuTransport","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["brosses"]
            }
        }
    },
    {
        text: "Benne",
        value: "trailer",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","capaciteEnM3","chargeUtile","materiauxCaisse","remorqueBennage","remorquePorte","attelageRemorque","suspensionFleche","typeEssieuRemorque","sectionEssieu","commandesHydrauliques","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["interieurCaisse_1","interieurCaisse_2"]
            }
        }
    },
    {
        text: "Betaillere",
        value: "livestockTrailer",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns: ["usureGenerale","chargeUtile","materiauxCaisse","usureChassis","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsBetaillere","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["interieurCaisse_1","interieurCaisse_2"]
            }
        }
    },
    {
        text: "Broyeur",
        value: "crusher",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns: ["usureGenerale","largeurTravailMetres","typeBroyeur","attelageOutil","repliageChassis","nombreCouteauxAremplacer","miseAuTransport","commandesHydrauliques","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsBroyeur","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["couteaux","interieurCaisse_1","interieurCaisse_2"]
            }
        }
    },
    {
        text: "Chargeur Frontal",
        value: "frontLoader",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns:[]
            },
            3:{
                addOns: ["usureGenerale","fonctionsChargeur","parallelogrammeChargeur","monolevier","tablierAttelage"]
            },
            4:{
                type:'regular',
                addOns:["monolevier","multicoupleur","outil_1","outil_2","outil_3","outil_4","outil_5"]
            }
        }
    },
    {
        text: "Charrue",
        value: "plough",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","typeCharrue","nombreSocs","securiteTravailSol","hauteurDegagement","entrePointes","sectionPoutre","diametreFusee","largeurTravailPouces","varilarge","typeSocs","usureSocs","typePointes","usurePointes","typeRasettes","usureRasettes","typeVersoirs","usureVersoirs","commandesHydrauliques","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["socs","rasette"]
            }
        }
    },
    {
        text: "Combine de Semis",
        value: "drillCombination",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","attelageOutil","repliageChassis","nombreRotors","fixationDentsHerse","nombreDentsARemplacer","typeRouleau","capaciteEnLitres","typeDistribution","typeEnterrage","usureSocs","commandesHydrauliques","conformite"]
            },
            4:{
                type:'regular',
                addOns:["dents","rouleau","boitier","cuve","socs","rampe"]
            }
        }
    },
    {
        text: "Cueilleur",
        value: "harvestingPlatform",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","typeCueilleur","nombreRangs","usureRouleauxEpanouilleurs","usureVis","usureCouteaux","usureChainesAlimentation","usureChaines","optionsCueilleur","conformite"]
            },
            4:{
                addOns:["broyeur","rouleauxEpanouilleurs","visAlimentation"]
            },
        }
    },
    {
        text: "Dechaumeur",
        value: "tillage",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","attelageOutil","repliageChassis","sectionPoutre","nombreSocsDisques","typeSocsDisques","usureSocsDisques","securiteTravailSol","typeReglageAngle","hauteurDegagement","typeRouleau","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["socs","securite"]
            }
        }
    },
    {
        text: "Derouleuse",
        value: "forageUnroller",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","attelageOutilManutention","tablierAttelage","usureTapis","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsDerouleuse","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["brasChargement","tapis"]
            },
        }
    },
    {
        text: "Desileuse pailleuse",
        value: "cattleFeeder",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","attelageOutilManutention","tablierAttelage","capaciteEnM3","entrainementTurbine","usureTurbine","nombreDemeleurs","entrainementDemeleurs","usureDemeleurs","vitessePDF","usureTapis","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["turbine","demeleurs"]
            }
        }
    },
    {
        text: "Enrubanneuse",
        value: "wrapper",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrBottes"]
            },
            3:{
                addOns:["usureGenerale","rotationEnrubanneuse","nombreRouleaux","nombreCourroies","commandesEnrubanneuse","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsEnrubanneuse","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["boitier"]
            }
        }
    },
    {
        text: "Ensileuse",
        value: "forageHarvester",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["hrsMoteur", "hrsRotor"]
            },
            3:{
                addOns:["usureGenerale","puissance","transmissionAutomoteur","largeurCanal","rouleauxAlimentation","eclateur","reglageContreCouteau","cabineAutomoteur","usureTolesRotor","usureTolesGoulotte","usureCouteaux","usureContreCouteau","marqueRecolteur","modeleRecolteur","vitesseMaximaleAutomoteur","autoguidageEmbarque","marquePneumatiquesAvant","dimensionPneumatiquesAvant","usurePneumatiquesAvant","marquePneumatiquesArriere","dimensionPneumatiquesArriere","usurePneumatiquesArriere","conformite"]
            },
            4:{
                type:'regular',
                addOns:["compteur","recolteur_1","recolteur_2","dimensionPneumatiqueAvant","dimensionPneumatiqueArriere","interieurCabine_1","interieurCabine_2","carteGrise"]
            }
        }
    },
    {
        text: "Epandeur engrais",
        value: "fertilizerSpreader",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","largeurTravailEngrais","capaciteEnLitres","attelageOutil","entrainementOutil","commandesHydrauliques","freinageOutil","usureAubes","usurePeinture","usureTremie","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsEpandeurEngrais","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["interieurCaisse_1","interieurCaisse_2","aubes"]
            }
        }
    },
    {
        text: "Epandeur fumier",
        value: "manureSpreader",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","capaciteEnM3","chargeUtile","largeurTravailNumerique","herissons","remorquePorte","usureHerissons","usureChainesBarettes","attelageRemorque","suspensionFleche","typeEssieuRemorque","sectionEssieu","commandesHydrauliques","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsEpandeurFumier","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["interieurCaisse_1","interieurCaisse_2","tapis","herissons"]
            },
        }
    },
    {
        text: "Epareuse",
        value: "hedgeCutters",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","puissance","porteeHorizontale","monolevier","attelageOutil","usureCouteaux","optionsEpareuse","conformite"]
            },
            4:{
                type:'regular',
                addOns:["couteaux"]
            }
        }
    },
    {
        text: "Faneuse",
        value: "tedder",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3: {
                addOns: ["usureGenerale","largeurTravailNumerique","attelageOutil","nombreRotors","nombreBrasRotors","nombreDentsARemplacer","commandesHydrauliques","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsFaneuse","conformite"]
            },
            4:{
                type:'trailed',
                addOns: []
            }
        }
    },
    {
        text: "Faucheuse",
        value: "mower",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3: {
                addOns: ["usureGenerale","typeFaucheuse","largeurTravailNumerique","attelageOutil","repliageChassis","nombreAssiettesTambours","fixationCouteaux","vitessePDF","conditionneur","usureDisques","usureLamier","commandesHydrauliques","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsFaucheuse","conformite"]
            },
            4:{
                type:'trailed',
                addOns: ["lamier","conditionneur"]
            }
        }
    },
    {
        text: "Godet",
        value: "dipper",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns:[]
            },
            3:{
                addOns: ["usureGenerale","largeurGodet","capaciteEnLitres","tablierAttelage","usureLame","commandesHydrauliques","optionsGodet"]
            },
            4:{
                type:'regular',
                addOns:["lame"]
            }
        }
    },
    {
        text: "Godet Desileur",
        value: "feedingDipper",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns:[]
            },
            3:{
                addOns: ["usureGenerale","largeurGodet","capaciteEnLitres","tablierAttelage","usureLame","usureSpire","commandesHydrauliques"]
            },
            4:{
                type:'regular',
                addOns:["lame","spire"]
            }
        }
    },
    {
        text: "Herse Rotative",
        value: "rotativeHarrow",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","attelageOutil","repliageChassis","nombreRotors","fixationDentsHerse","nombreDentsARemplacer","typeRouleau","commandesHydrauliques","optionsHerse","conformite"]
            },
            4:{
                type:'regular',
                addOns:["dents","rouleau"]
            }
        }
    },
    {
        text: "Lame",
        value: "blade",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns:[]
            },
            3:{
                addOns: ["usureGenerale","largeurTravailMetres","attelageOutil","repliageChassis","typeReglageAngle","usureLame","commandesHydrauliques","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsGodet"]
            },
            4:{
                type:'trailed',
                addOns:["lame"]
            }
        }
    },
    {
        text: "Melangeuse",
        value: "mixFeeder",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","attelageOutil","capaciteEnM3","entrainementTurbine","usureTurbine","nombreDemeleurs","entrainementDemeleurs","usureDemeleurs","vitessePDF","usureTapis","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsMelangeuse","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["turbine","demeleurs","tapis"]
            }
        }
    },
    {
        text: "Moissonneuse",
        value: "combineHarvester",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["hrsMoteur", "hrsBatteur"]
            },
            3:{
                addOns:["usureGenerale","typeSeparationMoissoneuse","puissance","transmissionAutomoteur","cabineAutomoteur","vitesseMaximaleAutomoteur","autoguidageEmbarque","compensationNiveau","plastron","nombreCouteauxBroyeur","chariot","marqueChariot","rallongeColza","plateauxTournesol","largeurCoupe","marquePneumatiquesAvant","dimensionPneumatiquesAvant","usurePneumatiquesAvant","marquePneumatiquesArriere","dimensionPneumatiquesArriere","usurePneumatiquesArriere","optionsMoissonneuse","conformite"]
            },
            4:{
                type:'regular',
                addOns:["compteur","recolteur_1","recolteur_2","dimensionPneumatiqueAvant","dimensionPneumatiqueArriere","interieurCabine_1","interieurCabine_2","carteGrise"]
            }
        }
    },
    {
        text: "Outil de plombage",
        value: "heavyRolls",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","attelageOutil","repliageChassis","usureRouleaux","typeRouleau","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["rouleau"]
            }
        }
    },
    {
        text: "Porteur Multifonction",
        value: "porteur_multifonction",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["hrsMoteur", "hrsSecouage"]
            },
            /** RAT : Ajouté par Mathieu : plz confirm */
            3: {
                addOns:["porteurType", "puissance", "transmission", "cabine", "porteurSeat", "dimensionPneumatiquesAvant", "marquePneumatiquesAvant", "usurePneumatiquesAvant", "dimensionPneumatiquesArriere", "marquePneumatiquesArriere", "usurePneumatiquesArriere", "multifonction", "porteurOptions", "porteurConformity"]
            },
            4: {
                type:'regular'  // RAT : plz confirm : step 4 est inexistante sur la v1 ?
            }

            /** end ajouté par Mathieu */
        }
    },
    {
        text: "Presse balles rondes",
        value: "baler",       
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["cptrBottes"]
            },
            3:{
                addOns:["usureGenerale","diametreBotte","typeChambrePresse","typeAmeneur","liageBotte","largeurPickUp","nombreDentsARemplacer","nombreCouteaux","usureChaines","usureCourroies","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsPresseBallesRondes","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["pickUp","entrainementGauche","entrainementDroit"]
            }
        }
    },
    {
        text: "Presse haute densite",
        value: "largeSquarebaler",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["cptrBottes"]
            },
            3:{
                addOns:["usureGenerale","canalPresse","largeurPickUp","nombreDentsARemplacer","nombreCouteaux","liagePresseCarre","nettoyageNoueurs","usureChaines","typeEssieuRemorque","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsPresseBallesRondes","optionsPresseBallesCarrees","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["pickUp","canal","entrainementGauche","entrainementDroit"]
            }
        }
    },
    {
        text: "Pulverisateur",
        value: "pulverisateur",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","materiauxRampe","capaciteEnLitres","attelageOutil","entrainementOutil","commandesHydrauliques","typePompe","debitPompe","regulation","repliageRampe","nombreTroncons","correcteurDeversPulverisateur","geometrieVariable","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsPulverisateur","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["boitier","rampeDroite","rampeGauche","cadreCentral","cuve"]
            }
        }
    },
    {
        text: "Semoir",
        value: "drill",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","typeSemoir","largeurTravailMetres","attelageOutil","repliageChassis","nombreRangs","typeRouleau","capaciteEnLitres","typeDistribution","typeEnterrage","usureSocs","commandesHydrauliques","optionsSemoir","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["dents","rouleau","boitier","cuve","socs","rampe"]
            }
        }
    },
    {
        text: "Tasse Avant",
        value: "frontRoll",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","attelageOutil","repliageChassis","usureRouleaux","typeRouleau","conformite"]
            },
            4:{
                type:'regular',
                addOns:["rouleau"]
            }
        }
    },
    {
        text: "Telescopique",
        value: "telehandler",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["hrsCptr"]
            },
            3: {
                addOns:["usureGenerale","puissance","capaciteEnTonnes","longueurFleche","teteAttelage","transmissionTracteur","nombreVitesses","vitesseMaximaleTracteur","rouesDirectrices","inverseur","freinage","cabine","climatisation","siege","radio","priseDeForceAR","distributeursArriere","chandelles","stabilisateurs","marquePneumatiquesAvant","dimensionPneumatiquesAvant","usurePneumatiquesAvant","marquePneumatiquesArriere","dimensionPneumatiquesArriere","usurePneumatiquesArriere","optionsTelescopique","conformite"]
            },
            4:{
                type:'regular',
                addOns:["compteur","dimensionPneumatiqueAvant","dimensionPneumatiqueArriere","interieurCabine_1","interieurCabine_2",,"outil_1","outil_2","outil_3","outil_4","outil_5","carteGrise"]
            }
        }
    },
    {
        text: "Tonne a lisier",
        value: "manureTankSpreader",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","capaciteEnLitres","chargeUtile","largeurTravailMetres","attelageRemorque","suspensionFleche","typeEssieuRemorque","sectionEssieu","commandesHydrauliques","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsTonneLisier","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["buses","pompage"]
            },
        }
    },
    {
        text: "Tracteur",
        value: "tractor",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["hrsCptr"]
            },
            3: {
                addOns:["usureGenerale","puissance","transmissionTracteur","nombreVitesses","vitesseMaximaleTracteur","inverseur","freinage","cabine","climatisation","siege","radio","priseDeForceAR","distributeursArriere","chandelles","stabilisateurs","pontAvant","relevageAvant","distributeursAvant","priseDeForceAV","autoguidageEmbarque","marquePneumatiquesAvant","dimensionPneumatiquesAvant","usurePneumatiquesAvant","marquePneumatiquesArriere","dimensionPneumatiquesArriere","usurePneumatiquesArriere","attelageTracteur"]
            },
            4:{
                type:'regular',
                addOns:["compteur","dimensionPneumatiqueAvant","dimensionPneumatiqueArriere","interieurCabine_1","interieurCabine_2","carteGrise"]
            }
        }
    }
  
]

const getNature = async(key) => {
    
    const nature = await Promise.resolve(
        Natures.filter((n) => n.key === key)
    )

    return nature.length ? nature[0] : undefined
}

const getAllPossibleFields = async(/*returnArray*/) => {
    
    let steps = await formsCatalog.formSteps({list: true})

    // { 1: {key, title, fields[]}, 2: {*idem*}, ... }
    const allPossibleFields = await new Promise((_steps) => {
        let joinedSteps = {};

        Object.keys(Steps).forEach(async(i) => {
            const {key, title} = Steps[i];

            const defaultFields = await Promise.resolve(Steps[i].fields || [])

            const regularFields = await Promise.resolve(
                (steps[i] && steps[i].regular) ? Object.keys(steps[i].regular).map((reg) => steps[i].regular[reg]) : []
            )
            const addOnsFields = await Promise.resolve(
                (steps[i] && steps[i].addOns) 
                ? Object.keys(steps[i].addOns).map((ao) => {
                    let addOn = steps[i].addOns[ao];
                    return {property: addOn.property, title: addOn.title}
                }) 
                : []
            )

            const joinedFields = await Promise.resolve([
                ...regularFields,
                ...addOnsFields,
                ...defaultFields
            ])

            // remove all field.title double occurences 
            //let noDuplicatedFields = await removeDuplicates(joinedFields, "title")

            joinedSteps[i] = await Promise.resolve({
                
                    key,
                    title,
                    //fields: noDuplicatedFields
                
            });
            
            if (i === "5") _steps(joinedSteps);

        })
    })
    
    return allPossibleFields
  
    
}

/**
 * @dev Form fields datas specific to step and nature
 * @return Promise resolving to an object containing specific keys
 */
const stepSpecificDatas = ({step, nature}) => new Promise(async(resolve) => {

    if (step === 2) {
    
        const brands = await Promise.resolve(               // step 2 specific to nature machines brands
            formsCatalog[nature.key] ? formsCatalog[nature.key].brands : undefined
        )

        // sort years from current year decreasing to 30 years before
        const _years = await new Promise(async(_years) => {  // 30 years before current year
            let y = new Date(Date.now()).getFullYear()
            let years = []

            for (let i=0; i<=30; i++) {
                years.push((y - (30-i))) 
                
                if (years[i] === y)
                    _years(years)
            }
        })

        //@notice : Picker must receive a string, 'sortNumsBy' stringifies each iteration
        //const years = await Utils.sortNumsBy({
            //data: _years,
            //decreasing: true
        //})

        
        resolve({brands, _years})
    }
    // no specific data for step
    else resolve({})

})

export default {Natures, getNature, getAllPossibleFields, stepSpecificDatas}