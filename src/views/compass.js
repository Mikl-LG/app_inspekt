import React, {Component, useEffect} from "react";
import Color from "../constants/color";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import CotationCatalog from "../constants/CotationCatalog";
import LinearProgress from "@material-ui/core/LinearProgress";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";

import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import {makeStyles} from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import TextField from "@material-ui/core/TextField";

import {
  Button,
  Grid,
  FormGroup,
  Paper,
  RadioGroup,
  Radio,
  Select,
  SnackbarContent,
  Slider,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backButton: {
    marginRight: theme.spacing(1),
  },
  cotationEdition: {
    marginLeft: "10px",
    color: Color.lightgrey,
    marginTop: "20px",
    border: "1px solid grey",
    borderRadius: "5px",
    width: "80%",
    padding: "5%",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  formControl: {
    width: "50%",
    marginTop: "20px",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: Color.secondary,
  },
  paper: {
    marginBottom: "60px",
    marginTop: "10px",
    padding: "20px",
  },
  root: {
    overflow: "scroll",
    marginBottom: "200px",
    padding: "5vw",
  },
  rootStepper: {
    width: "100%",
  },
  snackBarError: {
    backgroundColor: "#6A8D10",
  },
  snackbarSuccess: {
    backgroundColor: "#6A8D10",
  },
  snackbarWarning: {
    backgroundColor: "#E03616",
  },
  stepButton: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "30px",
  },
  toggle: {
    display: "flex",
    flexDirection: "column",
  },
}));

function getSteps() {
  return ["", "Nature", "Gamme", "Modèle", "Année", "Remise en état"];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return "Entrez votre numéro dexpertise :";
    case 1:
      return "Identification de votre machine :";
    case 2:
      return "Sélectionner une gamme :";
    case 3:
      return "Sélectionner un modèle :";
    case 4:
      return "Année de construction :";
    case 5:
      return "Evaluez l'usure des composants principaux :";
    default:
      return "Cette étape est indisponible...";
  }
}

export default function Predict({logInfo, inspektList, getInspekts, getQots}) {
  const [allModels, setAllModels] = React.useState();
  const [allRanges, setAllRanges] = React.useState();
  const [loader, setLoader] = React.useState({
    isOpen: false,
    title: "",
    content: "",
  });
  const [snackbar, setSnackbar] = React.useState({
    message: "Init",
    type: "snackbarSuccess",
    isOpen: false,
  });
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [cotation, setCotation] = React.useState({});

  const userInspektList = inspektList
    .filter((e) => e.openedBy === logInfo.user.id)
    .map((e) => e.id);

  const checkCotationId = (id) => {
    const expertise = inspektList.find((e) => e.id === parseInt(id));

    setCotation({
      ...cotation,
      id: parseInt(id),
      nature: expertise && expertise.machine.nature,
      brand: expertise && expertise.machine.brand,
      year: expertise && expertise.machine.year,
    });

    expertise &&
      getAllRanges(
        expertise.machine.nature.key,
        "NOREMAT",
        expertise.machine.brand
      ); //NATURE, cotationCatalog owner, BRAND
  };

  const closeQuotation = async (quotation) => {
    const body = await Promise.resolve({
      expId: cotation.id,
      //cieId: expertise.cieId && expertise.cieId, //TO BUILD IF COMPANY IS LINKED
      quotation,
    });

    //**ADD COTATION REQUEST**\\
    const url = `https://tiktrak.herokuapp.com/api?request=CLOSE_QUOTATIONS&token=${logInfo.token}`;
    let fetchOptions = await Promise.resolve({
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    let fetching = await fetch(url, fetchOptions);
    let error = await Promise.resolve(!fetching.ok);
    let response = !error && (await Promise.resolve(fetching.json()));

    if (error == false) {
      getInspekts();
      getQots();
      setSnackbar({
        message: "Cette machine est désormais évaluée, beau boulot.",
        type: "snackbarSuccess",
        isOpen: true,
      });
      setCotation({})
      setActiveStep(0);
    }
  };

  const getAllModels = (nature, catalogSupplier, brand, range) => {
    CotationCatalog.getAllModels(
      nature,
      catalogSupplier,
      brand,
      range
    ).then((data) => setAllModels(data));
  };

  const getAllRanges = (nature, catalogSupplier, brand) => {
    CotationCatalog.getAllRanges(nature, catalogSupplier, brand).then((data) =>
      setAllRanges(data)
    );
  };

  const getMachine = (nature, catalogSupplier, brand, range, model) => {
    CotationCatalog.getMachine(
      nature,
      catalogSupplier,
      brand,
      range,
      model
    ).then((data) => setCotation({...cotation, machine: data}));
  };

  const getMachineGrossPrice = () => {
    const age = new Date().getFullYear() - cotation.year;
    let devaluationFactor = 0;
    switch (age) {
      case "0":
        devaluationFactor = 0;
        break;
      case 1:
        devaluationFactor = 1 - cotation.machine.firstYearDevaluation / 100;
        break;
      case 2:
        devaluationFactor =
          (1 - cotation.machine.firstYearDevaluation / 100) *
          (1 - cotation.machine.secondYearDevaluation / 100);
        break;
      case 3:
        devaluationFactor =
          (1 - cotation.machine.firstYearDevaluation / 100) *
          (1 - cotation.machine.secondYearDevaluation / 100) *
          (1 - cotation.machine.thirdYearDevaluation / 100);
        break;
      case 4:
        devaluationFactor =
          (1 - cotation.machine.firstYearDevaluation / 100) *
          (1 - cotation.machine.secondYearDevaluation / 100) *
          (1 - cotation.machine.thirdYearDevaluation / 100) *
          (1 - cotation.machine.fourthYearDevaluation / 100);
        break;
      default:
        devaluationFactor =
          (1 - cotation.machine.firstYearDevaluation / 100) *
          (1 - cotation.machine.secondYearDevaluation / 100) *
          (1 - cotation.machine.thirdYearDevaluation / 100) *
          (1 - cotation.machine.fourthYearDevaluation / 100) *
          Math.pow(
            1 - parseInt(cotation.machine.standardYearDevaluation) / 100,
            parseInt(age - 3)
          );
    }

    const grossPrice =
      cotation.machine &&
      cotation.machine.purchasePriceList[cotation.year] * devaluationFactor;
    return grossPrice;
  };

  const getMachinePreparationCost = () => {
    let preparationCost =
      (cotation.machine.damages &&
        cotation.machine.damages.length &&
        cotation.machine.damages
          .map((damage) => parseInt(damage.price * (damage.value / 100)))
          .reduce((a, b) => a + b, 0)) ||
      0;

    return preparationCost;
  };

  const snackbarHandleClose = () => {
    setSnackbar({isOpen: false});
  };

  const setModel = (model) => {
    getMachine(
      cotation.nature.key,
      "NOREMAT",
      cotation.brand,
      cotation.range,
      model
    );
  };

  const setRange = (range) => {
    setCotation({...cotation, range: range});
    getAllModels(cotation.nature.key, "NOREMAT", cotation.brand, range);
  };

  const sliderChange = (damage, newValue) => {
    damage.value = newValue;

    const _damages = cotation.machine.damages.map((d) =>
      d.id !== damage.id ? d : damage
    );

    let _machine = {...cotation.machine, damages: _damages};
    setCotation({...cotation, machine: _machine});
  };

  const stepperHandleNext = async () => {
    if (activeStep === steps.length - 1) {
      const quotation = {
        estimatedBuyingPrice: String(Math.round(
          getMachineGrossPrice() - getMachinePreparationCost()
        )),
        estimatedRepairCost: String(getMachinePreparationCost()),
        userId: logInfo.user.id,
        comment: cotation.machine.damages
          .map((e) => {
            return `${e.name}:${e.value}%`;
          })
          .join(" - "),
        timestamp: Date.now(),
      };

      closeQuotation(quotation);
    } else if (activeStep === 1 && (allRanges == undefined || !allRanges.length)) {

        setSnackbar({
          message:
            "Il n’existe pas de catalogue de cotation pour ce matériel",
          type: "snackbarWarning",
          isOpen: true,
        });
    } else if (activeStep === 2 && !cotation.range) {
      setSnackbar({
        message:
          "Ola ! Pas si vite, tu dois sélectionner une gamme pour continuer.",
        type: "snackbarWarning",
        isOpen: true,
      });
    } else if (
      activeStep === 3 &&
      (!cotation.machine || !cotation.machine.model)
    ) {
      setSnackbar({
        message:
          "Ola ! Pas si vite, tu dois sélectionner un modèle pour continuer.",
        type: "snackbarWarning",
        isOpen: true,
      });
    } else if (activeStep === 4 && !cotation.year) {
      setSnackbar({
        message:
          "Ola ! Pas si vite, tu dois sélectionner une année pour continuer.",
        type: "snackbarWarning",
        isOpen: true,
      });
    } else {
      cotation.year && cotation.machine && cotation.machine.model && setCotation({...cotation,displayCotation:true})
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      activeStep !==0 && window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  };

  const stepperHandleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const stepperHandleReset = () => {
    setActiveStep(0);
  };

  /**USEEFFECT ONLY USED ON CONSOLE */
  useEffect(() => {
    console.log('cotation : ',cotation);
  })

  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} sm={8} lg={8}>
        <div className={classes.root}>
          {activeStep !== 0 && (
            <div className={classes.rootStepper}>
              <Stepper activeStep={activeStep} alternativeLabel id='stepper'>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <div>
                {activeStep === steps.length ? (
                  <div>
                    <Typography className={classes.instructions}>
                      Bravo
                    </Typography>
                    <Button onClick={stepperHandleReset}>
                      Ajouter une nouvelle cotation
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Typography className={classes.instructions}>
                      {getStepContent(activeStep)}
                    </Typography>
                  </div>
                )}
              </div>
            </div>
          )}
          {activeStep === 0 && (
            <Typography
              variant='h6'
              style={{
                width: "100%",
                textAlign: "center",
                padding: "30px",
                color: Color.secondary,
              }}>
              Créer une nouvelle cotation assistée.
            </Typography>
          )}
          {activeStep === 1 && (
            <div style={{width: "100%"}}>
              <FormControl>
                <TextField
                  error={userInspektList.indexOf(cotation.id) < 0}
                  id='expertiseId'
                  placeholder='Id de votre expertise'
                  value={cotation.id || null}
                  onChange={(e) => checkCotationId(e.target.value)}
                />
              </FormControl>
            </div>
          )}
          {activeStep === 2 && (
            <div className={classes.formContainer}>
              <FormControl component='fieldset'>
                <RadioGroup
                  aria-label='range'
                  name='range'
                  value={cotation.range}
                  onChange={(e) => setRange(e.target.value)}>
                  {allRanges &&
                    allRanges.map((range) => (
                      <FormControlLabel
                        id={range}
                        value={range}
                        control={<Radio color='primary' />}
                        label={range}
                      />
                    ))}
                </RadioGroup>
              </FormControl>
            </div>
          )}
          {activeStep === 3 && (
            <div className={classes.formContainer}>
              {allModels && (
                <FormControl component='fieldset'>
                  <RadioGroup
                    aria-label='range'
                    name='range'
                    value={cotation.machine && cotation.machine.model}
                    onChange={(e) => setModel(e.target.value)}>
                    {allModels &&
                      allModels.map((model) => (
                        <FormControlLabel
                          value={model}
                          control={<Radio color='primary' />}
                          label={model}
                        />
                      ))}
                  </RadioGroup>
                </FormControl>
              )}
            </div>
          )}
          {activeStep === 4 && (
            <div className={classes.formContainer}>
              <FormControl
                fullWidth
                variant='outlined'
                className={classes.formControl}>
                <InputLabel
                  id='brandSelectLabel'
                  className={classes.formSelect}>
                  Année
                </InputLabel>
                <Select
                  className={classes.formSelect}
                  id='yearsSelect'
                  label='Année'
                  labelId='brandSelectLabel'
                  placeholder='Année de construction'
                  disabled={!cotation.nature}
                  className={classes.formSelect}
                  value={cotation.year}
                  onChange={(e) =>
                    setCotation({...cotation, year: e.target.value})
                  }
                  inputProps={{id: "yearsSelect"}}>
                  {Object.keys(cotation.machine.purchasePriceList)
                    .sort((a, b) => b - a)
                    .map((year) => (
                      <MenuItem id={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
          )}
          {activeStep === 5 && (
            <div className={classes.formContainer}>
              <FormGroup style={{width: "100%"}}>
                {cotation &&
                  cotation.machine &&
                  cotation.machine.damages &&
                  cotation.machine.damages.map((damage) => (
                    <div style={{width: "100%", marginTop: "25px"}}>
                      <div>
                        <Typography>
                          {damage.name}{" "}
                          <span
                            style={{fontStyle: "italic", fontSize: "0.7em"}}>
                            {damage.value}%
                          </span>
                        </Typography>
                      </div>
                      <div style={{width: "60%"}}>
                        <Slider
                          defaultValue={damage.value}
                          step={25}
                          valueLabelDisplay='auto'
                          onChange={(e, newValue) =>
                            sliderChange(damage, newValue)
                          }
                        />
                      </div>
                    </div>
                  ))}
              </FormGroup>
            </div>
          )}
          <div className={classes.stepButton}>
            <Button
              disabled={activeStep === 0}
              onClick={stepperHandleBack}
              className={classes.backButton}>
              Retour
            </Button>
            <Button
              disabled={
                activeStep === 1 && userInspektList.indexOf(cotation.id) < 0
              }
              variant='contained'
              color='primary'
              onClick={stepperHandleNext}>
              {activeStep === steps.length - 1 ? "QOTER" : "Suivant"}
            </Button>
          </div>
          <div>
            <Snackbar
              autoHideDuration={3000}
              anchorOrigin={{vertical: "top", horizontal: "center"}}
              onClose={snackbarHandleClose}
              open={snackbar.isOpen}>
              <SnackbarContent
                className={classes[snackbar.type]}
                message={snackbar.message}
              />
            </Snackbar>
          </div>
          <div>
            <Dialog
              open={loader.isOpen}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'>
              <DialogTitle id='alert-dialog-title'>{loader.title}</DialogTitle>
              <DialogContent>
                <LinearProgress style={{width: "100%"}} />
                <LinearProgress style={{width: "100%"}} color='secondary' />
                <DialogContentText id='alert-dialog-description'>
                  {loader.content}
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Paper elevation1="true" className={classes.paper}>
          {cotation.nature ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}>
              <div className={classes.cotationEdition}>
                <Typography
                  style={{
                    width: "100%",
                    textAlign: "center",
                    fontWeight: "bold",
                    color: Color.secondary,
                    marginTop: "20px",
                  }}>
                  MACHINE
                </Typography>
                <Divider />
                <Typography>Nature : {cotation.nature.name}</Typography>
                {cotation.brand && (
                  <Typography>Marque : {cotation.brand}</Typography>
                )}
                {cotation.range && (
                  <Typography>Gamme : {cotation.range}</Typography>
                )}
                {cotation.machine && cotation.machine.model && (
                  <Typography>Modèle : {cotation.machine.model}</Typography>
                )}
                {cotation.year && (
                  <Typography>Année : {cotation.year}</Typography>
                )}
                {cotation.machine &&
                  cotation.machine.damages &&
                  cotation.machine.damages.length && (
                    <div style={{marginTop: "20px"}}>
                      <Typography
                        style={{
                          width: "100%",
                          textAlign: "center",
                          fontWeight: "bold",
                          color: Color.secondary,
                          marginTop: "20px",
                        }}>
                        REMISE EN ETAT
                      </Typography>
                      <Divider />
                      {cotation.machine.damages.map((damage) => (
                        <Typography>
                          {damage.name +
                            " : " +
                            new Intl.NumberFormat("fr-FR", {
                              style: "currency",
                              currency: "EUR",
                            }).format(
                              parseInt(damage.price * (damage.value / 100))
                            )}
                        </Typography>
                      ))}
                    </div>
                  )}
              </div>
              {cotation.displayCotation === true && (
                <div className={classes.cotationEdition}>
                  <Typography
                    style={{
                      width: "100%",
                      textAlign: "center",
                      fontWeight: "bold",
                      color: Color.secondary,
                    }}>
                    COTATION
                  </Typography>
                  <Divider />
                  <div style={{marginTop: "5px"}}>
                    <div style={{fontWeight: "bold"}}>
                      Prix catalogue en {cotation.year} :
                    </div>
                    {new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    }).format(
                      cotation.machine.purchasePriceList[cotation.year]
                    )}
                  </div>
                  <div style={{marginTop: "5px"}}>
                    <div style={{fontWeight: "bold"}}>
                      Règle de dépréciation :
                    </div>
                    {cotation.machine.firstYearDevaluation +
                      "%, " +
                      cotation.machine.secondYearDevaluation +
                      "%, " +
                      cotation.machine.thirdYearDevaluation +
                      "%, " +
                      cotation.machine.fourthYearDevaluation +
                      "%, puis " +
                      cotation.machine.standardYearDevaluation +
                      "%"}
                  </div>
                  <div style={{marginTop: "5px"}}>
                    <div style={{fontWeight: "bold"}}>
                      Valeur brute actuelle :
                    </div>
                    {new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    }).format(getMachineGrossPrice())}
                  </div>
                  {cotation.machine &&
                    cotation.machine.damages &&
                    cotation.machine.damages.length && (
                      <div style={{marginTop: "5px"}}>
                        <div style={{fontWeight: "bold"}}>Remise en état :</div>
                        {new Intl.NumberFormat("fr-FR", {
                          style: "currency",
                          currency: "EUR",
                        }).format(getMachinePreparationCost())}
                      </div>
                    )}
                  {
                    <div style={{color: Color.secondary, marginTop: "10px"}}>
                      <Divider />
                      <div style={{fontWeight: "bold"}}>Prix net :</div>
                      {new Intl.NumberFormat("fr-FR", {
                        style: "currency",
                        currency: "EUR",
                      }).format(
                        getMachineGrossPrice() - getMachinePreparationCost()
                      )}
                    </div>
                  }
                </div>
              )}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}>
              <img
                src={`https://inspekt-prod.s3.eu-west-3.amazonaws.com/COMPANIES/HEADERS/logoNoremat.jpg`}
                width='200px'
              />
              <Typography>
                Service développé par et pour les équipes NOREMAT. Seuls les
                utilisateurs NOREMAT ont accès à ce calculateur.
              </Typography>
            </div>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
