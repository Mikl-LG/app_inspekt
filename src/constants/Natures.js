import formsCatalog from './FormsCatalog'
import Steps from './Steps';

const Natures = [
    {
        name: "Aligneuse de pierres",
        key: "aligneuse",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"] // ex. ['tires'] (used by NewEvaluation.js)
            },
            3: {
                addOns: ["usureGenerale","largeurTravailMetres","typeAligneusePierres","attelageOutil","repliageChassis","nombrePoutres","sectionPoutre","usureSocs","typeReglageAngle","miseAuTransport","commandesHydrauliques","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite","documents"]
            },
            4:{
                type:'trailed',
                addOns:[]
            }
        }
    },
    {
        name: "Andaineur",
        key: "rake",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns:[]
            },
            3: {
                addOns: ["usureGenerale","largeurTravailMetres","attelageOutil","nombreRotors","nombreBrasRotors","nombreDentsARemplacer","miseEnAndain","suiviSol","essieuPrincipal","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsAndaineur","conformite","documents"]
            },
            4:{
                type:'trailed',
                addOns: ["bras", "toile"]
            }
        }
    },
    {
        name: "Autochargeuse",
        key: "silageTrailer",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","capaciteEnM3","chargeUtile","largeurPickUp","nombreDentsARemplacer","nombreCouteaux","dechargementRemorque","usureChaines","attelageRemorque","suspensionFleche","typeEssieuRemorque","sectionEssieu","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsAutochargeuse","conformite","documents"]
            },
            4:{
                type:'trailed',
                addOns:["pickUp","couteaux","interieurCaisse_1","interieurCaisse_2"]
            }
        }
    },
    {
        name: "Balayeuse",
        key: "sweeper",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","entrainementOutil","attelageOutil","repliageChassis","commandesHydrauliques","typeReglageAngle","usureChassis","usureBalais","miseAuTransport","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite","documents"]
            },
            4:{
                type:'trailed',
                addOns:["brosses"]
            }
        }
    },
    {
        name: "Benne",
        key: "trailer",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","capaciteEnM3","chargeUtile","materiauxCaisse","remorqueBennage","remorquePorte","attelageRemorque","suspensionFleche","typeEssieuRemorque","sectionEssieu","commandesHydrauliques","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite","documents"]
            },
            4:{
                type:'trailed',
                addOns:["interieurCaisse_1","interieurCaisse_2"]
            }
        }
    },
    {
        name: "Betaillere",
        key: "livestockTrailer",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns: ["usureGenerale","chargeUtile","materiauxCaisse","usureChassis","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsBetaillere","conformite","documents"]
            },
            4:{
                type:'trailed',
                addOns:["interieurCaisse_1","interieurCaisse_2"]
            }
        }
    },
    {
        name: "Broyeur",
        key: "crusher",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"]
            },
            3:{
                addOns: ["usureGenerale","largeurTravailMetres","typeBroyeur","attelageOutil","repliageChassis","nombreCouteauxAremplacer","miseAuTransport","commandesHydrauliques","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsBroyeur","conformite","documents"]
            },
            4:{
                type:'trailed',
                addOns:["couteaux","interieurCaisse_1","interieurCaisse_2"]
            }
        }
    },
    {
        name: "Chargeur Frontal",
        key: "frontLoader",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns:[]
            },
            3:{
                addOns: ["usureGenerale","fonctionsChargeur","parallelogrammeChargeur","monolevier","tablierAttelage","documents"]
            },
            4:{
                type:'regular',
                addOns:["monolevier","multicoupleur","outil_1","outil_2","outil_3","outil_4","outil_5"]
            }
        }
    },
    {
        name: "Charrue",
        key: "plough",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"]
            },
            3:{
                addOns:["usureGenerale","typeCharrue","nombreSocs","securiteTravailSol","hauteurDegagement","entrePointes","sectionPoutre","diametreFusee","largeurTravailPouces","varilarge","typeSocs","usureSocs","typePointes","usurePointes","typeRasettes","usureRasettes","typeVersoirs","usureVersoirs","commandesHydrauliques","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite","documents"]
            },
            4:{
                type:'trailed',
                addOns:["socs","rasette"]
            }
        }
    },
    {
        name: "Combine de Semis",
        key: "drillCombination",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","attelageOutil","repliageChassis","nombreRotors","fixationDentsHerse","nombreDentsARemplacer","typeRouleau","capaciteEnLitres","typeDistribution","typeEnterrage","usureSocs","commandesHydrauliques","conformite","documents"]
            },
            4:{
                type:'regular',
                addOns:["dents","rouleau","boitier","cuve","socs","rampe"]
            }
        }
    },
    {
        name: "Cueilleur",
        key: "harvestingPlatform",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"]
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","typeCueilleur","nombreRangs","ecartementRangs","reglagePlaques","marqueTablierAttelageMoissonneuse","usureRouleauxEpanouilleurs","usureVis","usureCouteaux","usureChainesAlimentation","usureChaines","optionsCueilleur","conformite","documents"]
            },
            4:{
                addOns:["broyeur","rouleauxEpanouilleurs","visAlimentation"]
            },
        }
    },
    {
        name: "Dechaumeur",
        key: "tillage",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"]
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","attelageOutil","repliageChassis","sectionPoutre","nombreSocsDisques","typeSocsDisques","usureSocsDisques","securiteTravailSol","typeReglageAngle","hauteurDegagement","typeRouleau","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite","documents"]
            },
            4:{
                type:'trailed',
                addOns:["socs","securite"]
            }
        }
    },
    {
        name: "Derouleuse",
        key: "forageUnroller",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","attelageOutil","tablierAttelage","usureTapis","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsDerouleuse","conformite","documents"]
            },
            4:{
                type:'trailed',
                addOns:["brasChargement","tapis"]
            },
        }
    },
    {
        name: "Desileuse pailleuse",
        key: "cattleFeeder",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","attelageOutil","capaciteEnM3","entrainementTurbine","usureTurbine","nombreDemeleurs","entrainementDemeleurs","usureDemeleurs","vitessePDF","usureTapis","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite","documents"]
            },
            4:{
                type:'trailed',
                addOns:["turbine","demeleurs"]
            }
        }
    },
    {
        name: "Divers",
        key: "nondefined",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["version","hrsMoteur","hrsPrev","nbrHectares","nbrBottes"]
            },
            3:{
                addOns:["usureGenerale","attelageOutil","capaciteEnM3","repliageChassis","sectionPoutre","nombreSocsDisques","typeSocsDisques","usureSocsDisques","securiteTravailSol","typeReglageAngle","hauteurDegagement","typeRouleau","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite","documents"]
            },
            4:{
                type:'trailed',
                addOns:[]
            }
        }
    },
    {
        name: "Enrubanneuse",
        key: "wrapper",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrBottes"]
            },
            3:{
                addOns:["usureGenerale","attelageOutil","diametreMaxBotte","rotationEnrubanneuse","nombreRouleaux","nombreCourroies","commandesEnrubanneuse","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsEnrubanneuse","conformite","documents"]
            },
            4:{
                type:'trailed',
                addOns:["boitier"]
            }
        }
    },
    {
        name: "Ensileuse",
        key: "forageHarvester",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["hrsMoteur", "hrsRotor"]
            },
            3:{
                addOns:["usureGenerale","puissance","transmissionAutomoteur","transmissionAutomoteurModele","largeurCanal","rouleauxAlimentation","eclateur","reglageContreCouteau","cabineAutomoteur","usureTolesRotor","usureTolesGoulotte","usureCouteaux","usureContreCouteau","marqueRecolteur","modeleRecolteur","vitesseMaximaleAutomoteur","autoguidageEmbarque","marquePneumatiquesAvant","dimensionPneumatiquesAvant","usurePneumatiquesAvant","marquePneumatiquesArriere","dimensionPneumatiquesArriere","usurePneumatiquesArriere","optionsEnsileuse","conformite","documents"]
            },
            4:{
                type:'regular',
                addOns:["compteur","recolteur_1","recolteur_2","dimensionPneumatiqueAvant","dimensionPneumatiqueArriere","interieurCabine_1","interieurCabine_2","carteGrise"]
            }
        }
    },
    {
        name: "Epandeur engrais",
        key: "fertilizerSpreader",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","capaciteEnLitres","attelageOutil","entrainementOutil","commandesHydrauliques","freinageOutil","usureAubes","usurePeinture","usureTremie","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsEpandeurEngrais","conformite","documents"]
            },
            4:{
                type:'trailed',
                addOns:["interieurCaisse_1","interieurCaisse_2","aubes"]
            }
        }
    },
    {
        name: "Epandeur fumier",
        key: "manureSpreader",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","capaciteEnM3","chargeUtile","largeurTravailMetres","herissons","remorquePorte","usureHerissons","usureChainesBarettes","attelageRemorque","suspensionFleche","typeEssieuRemorque","sectionEssieu","commandesHydrauliques","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsEpandeurFumier","conformite","documents"]
            },
            4:{
                type:'trailed',
                addOns:["interieurCaisse_1","interieurCaisse_2","tapis","herissons"]
            },
        }
    },
    {
        name: "Epareuse",
        key: "reachMower",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","puissance","porteeHorizontale","monolevier","attelageOutil","usureCouteaux","optionsEpareuse","conformite","documents"]
            },
            4:{
                type:'regular',
                addOns:["couteaux"]
            }
        }
    },
    {
        name: "Faneuse",
        key: "tedder",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3: {
                addOns: ["usureGenerale","largeurTravailMetres","attelageOutil","nombreRotors","nombreBrasRotors","nombreDentsARemplacer","commandesHydrauliques","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsFaneuse","conformite","documents"]
            },
            4:{
                type:'trailed',
                addOns: []
            }
        }
    },
    {
        name: "Faucheuse",
        key: "mower",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"]
            },
            3: {
                addOns: ["usureGenerale","typeFaucheuse","largeurTravailMetres","attelageOutil","repliageChassis","nombreAssiettesTambours","fixationCouteaux","vitessePDF","conditionneur","usureDisques","usureLamier","commandesHydrauliques","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsFaucheuse","conformite","documents"]
            },
            4:{
                type:'trailed',
                addOns: ["lamier","conditionneur"]
            }
        }
    },
    {
        name: "Godet",
        key: "dipper",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns:[]
            },
            3:{
                addOns: ["usureGenerale","largeurGodet","capaciteEnLitres","tablierAttelage","usureLame","commandesHydrauliques","optionsGodet","documents"]
            },
            4:{
                type:'regular',
                addOns:["lame"]
            }
        }
    },
    {
        name: "Godet Desileur",
        key: "feedingDipper",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns:[]
            },
            3:{
                addOns: ["usureGenerale","largeurGodet","capaciteEnLitres","tablierAttelage","usureLame","usureSpire","commandesHydrauliques","documents"]
            },
            4:{
                type:'regular',
                addOns:["lame","spire"]
            }
        }
    },
    {
        name: "Herse Rotative",
        key: "rotativeHarrow",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"]
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","attelageOutil","repliageChassis","nombreRotors","fixationDentsHerse","nombreDentsARemplacer","typeRouleau","commandesHydrauliques","optionsHerse","conformite","documents"]
            },
            4:{
                type:'regular',
                addOns:["dents","rouleau"]
            }
        }
    },
    {
        name: "Lame",
        key: "blade",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns:[]
            },
            3:{
                addOns: ["usureGenerale","largeurTravailMetres","attelageOutil","repliageChassis","typeReglageAngle","usureLame","commandesHydrauliques","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsGodet","documents"]
            },
            4:{
                type:'trailed',
                addOns:["lame"]
            }
        }
    },
    {
        name: "Machine à vendanger",
        key: "grapeHarvesting",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["version","hrsMoteur", "hrsRecolte","hrsPrev"]
            },
            3: {
                addOns:["puissance","cabine","climatisation","siege","radio","capaciteBacEnLitres","nombreBrasCueilleurs","dimensionPneumatiquesAvant", "marquePneumatiquesAvant", "usurePneumatiquesAvant", "dimensionPneumatiquesArriere", "marquePneumatiquesArriere", "usurePneumatiquesArriere","optionTeteRecolte","multifonction","optionsMachineVendanger","conformite","documents"]
            },
            4: {
                type:'regular',
                addOns:["compteur","interieurCabine_1","interieurCabine_2","toit","spoilerDroit","spoilerGauche","capotLateral","avant","arriere","dimensionPneumatiqueAvant","dimensionPneumatiqueArriere","interieurTeteRecolte","ecaille","tapis","virages","baches","portes","defautChassis","defautDirection","defautMoteurRoue","defautPompeHydraulique","carteGrise"]
            }
        }
    },
    {
        name: "Melangeuse",
        key: "mixFeeder",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","attelageOutil","capaciteEnM3","entrainementTurbine","usureTurbine","nombreDemeleurs","entrainementDemeleurs","usureDemeleurs","vitessePDF","usureTapis","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsDesileuse","conformite","documents"]
            },
            4:{
                type:'trailed',
                addOns:["turbine","demeleurs","tapis"]
            }
        }
    },
    {
        name: "Moissonneuse",
        key: "combineHarvester",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["hrsMoteur", "hrsBatteur"]
            },
            3:{
                addOns:["usureGenerale","typeSeparationMoissoneuse","puissance","transmissionAutomoteur","cabineAutomoteur","vitesseMaximaleAutomoteur","autoguidageEmbarque","compensationNiveau","plastron","nombreCouteauxBroyeur","chariot","marqueChariot","rallongeColza","plateauxTournesol","largeurCoupe","marquePneumatiquesAvant","dimensionPneumatiquesAvant","usurePneumatiquesAvant","marquePneumatiquesArriere","dimensionPneumatiquesArriere","usurePneumatiquesArriere","optionsMoissonneuse","conformite","documents"]
            },
            4:{
                type:'regular',
                addOns:["compteur","recolteur_1","recolteur_2","dimensionPneumatiqueAvant","dimensionPneumatiqueArriere","interieurCabine_1","interieurCabine_2","carteGrise"]
            }
        }
    },
    {
        name: "Outil de plombage",
        key: "heavyRolls",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"]
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","attelageOutil","repliageChassis","usureRouleaux","typeRouleau","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite","documents"]
            },
            4:{
                type:'trailed',
                addOns:["rouleau"]
            }
        }
    },
    {
        name: "Pick-up",
        key: "pickUp",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"]
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","repliageChassis","nombreDentsARemplacer","usureChaines","usureRouleaux","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite","documents"]
            },
            4:{
                type:'trailed',
                addOns:["pickUp","entrainementGauche","entrainementDroit","rouleau"]
            }
        }
    },
    {
        name: "Presse balles rondes",
        key: "baler",       
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["cptrBottes"]
            },
            3:{
                addOns:["usureGenerale","diametreMaxBotte","typeChambrePresse","typeAmeneur","liageBotte","largeurPickUp","nombreDentsARemplacer","nombreCouteaux","usureChaines","usureCourroies","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsPresseBallesRondes","conformite","documents"]
            },
            4:{
                type:'trailed',
                addOns:["pickUp","entrainementGauche","entrainementDroit"]
            }
        }
    },
    {
        name: "Presse haute densite",
        key: "largeSquarebaler",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["cptrBottes"]
            },
            3:{
                addOns:["usureGenerale","canalPresse","largeurPickUp","nombreDentsARemplacer","nombreCouteaux","liagePresseCarre","nettoyageNoueurs","usureChaines","typeEssieuRemorque","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsPresseBallesCarrees","conformite","documents"]
            },
            4:{
                type:'trailed',
                addOns:["pickUp","canal","entrainementGauche","entrainementDroit"]
            }
        }
    },
    {
        name: "Pulverisateur",
        key: "sprayer",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"]
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","materiauxRampe","capaciteEnLitres","attelageOutil","entrainementOutil","commandesHydrauliques","typePompe","debitPompe","regulation","repliageRampe","nombreTroncons","porteBuse","correcteurDeversPulverisateur","geometrieVariable","suspensionEssieu","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsPulverisateur","conformite","documents"]
            },
            4:{
                type:'trailed',
                addOns:["boitier","rampeDroite","rampeGauche","cadreCentral","cuve","controleTechnique"]
            }
        }
    },
    {
        name: "Pulverisateur automoteur",
        key: "sprayerAutomotive",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["version","hrsMoteur","hrsPrev","nbrHectares"]
            },
            3:{
                addOns:["usureGenerale","puissance","transmissionTracteur","transmissionTracteurModele","nombreVitesses","vitesseMaximaleTracteur","inverseur","freinage","cabine","climatisation","siege","radio","autoguidageEmbarque","largeurTravailMetres","materiauxRampe","capaciteEnLitres","typePompe","debitPompe","regulation","repliageRampe","nombreTroncons","porteBuse","correcteurDeversPulverisateur","geometrieVariable","suspensionEssieu","freinage","marquePneumatiquesAvant","dimensionPneumatiquesAvant","usurePneumatiquesAvant","marquePneumatiquesArriere","dimensionPneumatiquesArriere","usurePneumatiquesArriere","optionsPulverisateurAutomoteur","conformite","documents"]
            },
            4:{
                type:'regular',
                addOns:["compteur","dimensionPneumatiqueAvant","dimensionPneumatiqueArriere","interieurCabine_1","interieurCabine_2","carteGrise","attelage","boitier","rampeDroite","rampeGauche","cadreCentral","cuve"]
            }
        }
    },
    {
        name: "Quad",
        key: "quad",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["version","hrsMoteur","hrsPrev","compteurKm"]
            },
            3:{
                addOns:["usureGenerale","puissance","motorisationQuad","cylindree","capaciteReservoir","hauteur","largeur","longueur","transmissionQuad","nombreVitesses","vitesseMaximaleQuad","cabine","climatisation","siege","radio","marquePneumatiquesAvant","dimensionPneumatiquesAvant","usurePneumatiquesAvant","marquePneumatiquesArriere","dimensionPneumatiquesArriere","usurePneumatiquesArriere","optionsQuad","conformite","documents"]
            },
            4:{
                type:'regular',
                addOns:["compteur","dimensionPneumatiqueAvant","dimensionPneumatiqueArriere","carteGrise","attelage"]
            }
        }
    },
    {
        name: "Semoir en ligne",
        key: "inlineDrill",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"]
            },
            3:{
                addOns:["usureGenerale","typeSemoir","largeurTravailMetres","attelageOutil","repliageChassis","nombreRangs","typeRouleau","capaciteEnLitres","typeDistribution","typeEnterrage","usureSocs","commandesHydrauliques","optionsSemoir","conformite","documents"]
            },
            4:{
                type:'trailed',
                addOns:["dents","rouleau","boitier","cuve","socs","rampe"]
            }
        }
    },
    {
        name: "Semoir monograine",
        key: "precisionSeeder",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"]
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","attelageOutil","repliageChassis","nombreRangs","typeRouleau","capaciteEnLitres","typeDistribution","typeRotorDoseur","typeDisqueDoseur","diametreDisquesSemeurs","typeEnterrage","usureSocs","commandesHydrauliques","optionsSemoir","conformite","documents"]
            },
            4:{
                type:'trailed',
                addOns:["dents","rouleau","boitier","cuve","socs","rampe"]
            }
        }
    },
    {
        name: "Tasse Avant",
        key: "frontRoll",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","attelageOutil","repliageChassis","usureRouleaux","typeRouleau","conformite","documents"]
            },
            4:{
                type:'regular',
                addOns:["rouleau"]
            }
        }
    },
    {
        name: "Telescopique",
        key: "telehandler",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["hrsMoteur","hrsPrev"]
            },
            3: {
                addOns:["usureGenerale","puissance","capaciteEnTonnes","longueurFleche","teteAttelage","transmissionTracteur","nombreVitesses","vitesseMaximaleTracteur","rouesDirectrices","inverseur","freinage","cabine","climatisation","siege","radio","priseDeForceAR","distributeursArriere","chandelles","stabilisateurs","marquePneumatiquesAvant","dimensionPneumatiquesAvant","usurePneumatiquesAvant","marquePneumatiquesArriere","dimensionPneumatiquesArriere","usurePneumatiquesArriere","optionsTelescopique","conformite","documents"]
            },
            4:{
                type:'regular',
                addOns:["compteur","dimensionPneumatiqueAvant","dimensionPneumatiqueArriere","interieurCabine_1","interieurCabine_2","outil_1","outil_2","outil_3","outil_4","outil_5","carteGrise"]
            }
        }
    },
    {
        name: "Tonne a lisier",
        key: "manureTankSpreader",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","capaciteEnLitres","chargeUtile","largeurTravailMetres","attelageRemorque","suspensionFleche","typeEssieuRemorque","sectionEssieu","commandesHydrauliques","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsTonneLisier","conformite","documents"]
            },
            4:{
                type:'trailed',
                addOns:["buses","pompage"]
            },
        }
    },
    {
        name: "Tracteur",
        key: "tractor",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["version","hrsMoteur","hrsPrev"]
            },
            3: {
                addOns:["usureGenerale","puissance","transmissionTracteur","transmissionTracteurModele","nombreVitesses","vitesseMaximaleTracteur","inverseur","freinage","cabine","climatisation","siege","radio","priseDeForceAR","distributeursArriere","distributeursArriereElectriques","chandelles","stabilisateurs","pontAvant","relevageAvant","distributeursAvant","priseDeForceAV","autoguidageEmbarque","marquePneumatiquesAvant","dimensionPneumatiquesAvant","usurePneumatiquesAvant","marquePneumatiquesArriere","dimensionPneumatiquesArriere","usurePneumatiquesArriere","attelageTracteur","documents"]
            },
            4:{
                type:'regular',
                addOns:["compteur","dimensionPneumatiqueAvant","dimensionPneumatiqueArriere","interieurCabine_1","interieurCabine_2","carteGrise","attelage"]
            }
        }
    },
    {
        name: "Tracteur chargeur",
        key: "tractorLoader",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["version","hrsMoteur","hrsPrev"]
            },
            3: {
                addOns:["usureGenerale","puissance","transmissionTracteur","transmissionTracteurModele","nombreVitesses","vitesseMaximaleTracteur","inverseur","freinage","cabine","climatisation","siege","radio","priseDeForceAR","distributeursArriere","chandelles","stabilisateurs","pontAvant","relevageAvant","distributeursAvant","priseDeForceAV","autoguidageEmbarque","marquePneumatiquesAvant","dimensionPneumatiquesAvant","usurePneumatiquesAvant","marquePneumatiquesArriere","dimensionPneumatiquesArriere","usurePneumatiquesArriere","attelageTracteur","marqueChargeur","modeleChargeur","serieChargeur","usureGenerale","fonctionsChargeur","parallelogrammeChargeur","monolevier","tablierAttelage","documents"]
            },
            4:{
                type:'regular',
                addOns:["compteur","dimensionPneumatiqueAvant","dimensionPneumatiqueArriere","interieurCabine_1","interieurCabine_2","carteGrise","attelage","monolevier","multicoupleur","outil_1","outil_2","outil_3","outil_4","outil_5"]
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