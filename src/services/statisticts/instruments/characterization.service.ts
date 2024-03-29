import type { UserMoreInfo } from "@prisma/client";

type expectedType = Partial<UserMoreInfo>[];

function getAgeCounts(usersMoreInfo: expectedType) {
  const ageRanges = [
    { min: 0, max: 17, label: "Entre 0 y 17" },
    { min: 18, max: 25, label: "Entre 18 y 25" },
    { min: 26, max: 33, label: "Entre 26 y 33" },
    { min: 34, max: 41, label: "Entre 34 y 41" },
    { min: 42, max: 49, label: "Entre 42 y 49" },
    { min: 50, max: 57, label: "Entre 50 y 57" },
    { min: 58, max: 130, label: "Más de 57" },
  ];

  const ageCounts: { [key: string]: number } = ageRanges.reduce(
    (acc, range) => {
      acc[range.label] = usersMoreInfo.filter(user => {
        const userAge = parseInt(user.age![0]); // Tomar solo el valor inferior del rango
        return userAge >= range.min && userAge <= range.max;
      }).length;
      return acc;
    },
    {} as { [key: string]: number },
  );

  return ageCounts;
}

function getCivilStatusCounts(usersMoreInfo: expectedType) {
  const civilStatusCounts: { [key: string]: number } = {};
  usersMoreInfo.forEach(user => {
    const status = user.civilStatus!.toLowerCase();
    civilStatusCounts[status] = (civilStatusCounts[status] || 0) + 1;
  });

  // Transformar el objeto en el formato deseado con la primera letra en mayúscula
  const resultCivilStatus: { [key: string]: number } = {};
  Object.keys(civilStatusCounts).forEach(status => {
    const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);
    resultCivilStatus[formattedStatus] = civilStatusCounts[status];
  });

  return resultCivilStatus;
}

function getEducationLevelCounts(usersMoreInfo: expectedType) {
  const educationLevelCounts: { [key: string]: number } = {};
  usersMoreInfo.forEach(user => {
    const level = user.educationLevel!.toLowerCase();
    educationLevelCounts[level] = (educationLevelCounts[level] || 0) + 1;
  });

  // Transformar el objeto en el formato deseado con la primera letra en mayúscula
  const resultEducationLevel: { [key: string]: number } = {};
  Object.keys(educationLevelCounts).forEach(level => {
    const formattedLevel = level.charAt(0).toUpperCase() + level.slice(1);
    resultEducationLevel[formattedLevel] = educationLevelCounts[level];
  });

  return resultEducationLevel;
}

function getFinancialProductsCounts(usersMoreInfo: expectedType) {
  const financialProductsOptions = [
    { value: "cuenta de ahorros", label: "Cuenta de ahorros" },
    { value: "cuenta corriente", label: "Cuenta corriente" },
    { value: "tarjeta de credito", label: "Tarjeta de crédito" },
    { value: "tarjeta debito", label: "Tarjeta debito" },
    { value: "CDT", label: "CDT" },
    {
      value: "credito hipotecario",
      label: "Crédito hipotecario (crédito de vivienda)",
    },
    {
      value: "credito de libre inversión",
      label: "Crédito de libre inversión",
    },
    { value: "fondos de inversion", label: "Fondos de inversión" },
    { value: "credito educativo", label: "Crédito educativo" },
    { value: "ninguno", label: "Ninguno de los anteriores" },
  ];

  const financialProductsCounts: { [key: string]: number } = {};
  usersMoreInfo.forEach(user => {
    user.financialProducts!.forEach(product => {
      financialProductsCounts[product] =
        (financialProductsCounts[product] || 0) + 1;
    });
  });

  // Transformar el objeto en el formato deseado
  const resultFinancialProducts: { [key: string]: number } = {};
  Object.keys(financialProductsCounts).forEach(product => {
    const formattedProduct = financialProductsOptions.find(
      option => option.value === product,
    )?.label;
    resultFinancialProducts[formattedProduct || ""] =
      financialProductsCounts[product];
  });

  return resultFinancialProducts;
}

function getGenderCounts(usersMoreInfo: expectedType) {
  const genderCounts: { [key: string]: number } = {};
  usersMoreInfo.forEach(user => {
    const gender = user.gender!.toLowerCase();
    genderCounts[gender] = (genderCounts[gender] || 0) + 1;
  });

  // Transformar el objeto en el formato deseado con la primera letra en mayúscula
  const resultObject: { [key: string]: number } = {};
  Object.keys(genderCounts).forEach(gender => {
    const formattedGender = gender.charAt(0).toUpperCase() + gender.slice(1);
    resultObject[formattedGender] = genderCounts[gender];
  });

  return resultObject;
}

function getHealthSystemAffiliationCounts(usersMoreInfo: expectedType) {
  const healthSystemAffiliationCounts: { [key: string]: number } = {};
  usersMoreInfo.forEach(user => {
    const affiliationType = user.healthSystemAffiliation!.toLowerCase();
    healthSystemAffiliationCounts[affiliationType] =
      (healthSystemAffiliationCounts[affiliationType] || 0) + 1;
  });

  // Transformar el objeto en el formato deseado con la primera letra en mayúscula
  const resultHealthSystemAffiliation: { [key: string]: number } = {};
  Object.keys(healthSystemAffiliationCounts).forEach(affiliationType => {
    const formattedAffiliationType =
      affiliationType.charAt(0).toUpperCase() + affiliationType.slice(1);
    resultHealthSystemAffiliation[formattedAffiliationType] =
      healthSystemAffiliationCounts[affiliationType];
  });

  return resultHealthSystemAffiliation;
}

function getHouseServicesCounts(usersMoreInfo: expectedType) {
  const houseServicesOptions = [
    { value: "acueducto", label: "Acueducto" },
    { value: "alcantarillado", label: "Alcantarillado" },
    { value: "energia", label: "Energía" },
    { value: "gas", label: "Gas" },
    { value: "telefonia", label: "Telefonía" },
    { value: "internet", label: "Internet" },
    { value: "tv por cable", label: "TV por cable" },
    { value: "no-house-services", label: "Ninguno de los anteriores" },
  ];

  const houseServicesCounts: { [key: string]: number } = {};
  usersMoreInfo.forEach(user => {
    user.houseServices!.forEach(service => {
      houseServicesCounts[service] = (houseServicesCounts[service] || 0) + 1;
    });
  });

  // Transformar el objeto en el formato deseado
  const resultHouseServices: { [key: string]: number } = {};
  Object.keys(houseServicesCounts).forEach(service => {
    const formattedService = houseServicesOptions.find(
      option => option.value === service,
    )?.label;
    resultHouseServices[formattedService || ""] = houseServicesCounts[service];
  });

  return resultHouseServices;
}

function getIncomeComeFromCounts(usersMoreInfo: expectedType) {
  const incomeComeFromCounts: { [key: string]: number } = {};
  usersMoreInfo.forEach(user => {
    const incomeSource = user.incomeComeFrom!.toLowerCase();
    incomeComeFromCounts[incomeSource] =
      (incomeComeFromCounts[incomeSource] || 0) + 1;
  });

  // Transformar el objeto en el formato deseado con la primera letra en mayúscula
  const resultIncomeComeFrom: { [key: string]: number } = {};
  Object.keys(incomeComeFromCounts).forEach(incomeSource => {
    const formattedIncomeSource =
      incomeSource.charAt(0).toUpperCase() + incomeSource.slice(1);
    resultIncomeComeFrom[formattedIncomeSource] =
      incomeComeFromCounts[incomeSource];
  });

  return resultIncomeComeFrom;
}

function getIsInAPensionFundCounts(usersMoreInfo: expectedType) {
  const pensionFundCounts: { [key: string]: number } = {};
  usersMoreInfo.forEach(user => {
    const isInAPensionFund = user.isInAPensionFund ? "Si" : "No";
    pensionFundCounts[isInAPensionFund] =
      (pensionFundCounts[isInAPensionFund] || 0) + 1;
  });

  // Transformar el objeto en el formato deseado
  const resultPensionFund: { [key: string]: number } = {};
  Object.keys(pensionFundCounts).forEach(isInAPensionFund => {
    resultPensionFund[isInAPensionFund] = pensionFundCounts[isInAPensionFund];
  });

  return resultPensionFund;
}

function getNumberPeopleContributingCounts(usersMoreInfo: expectedType) {
  const numberPeopleContributingOptions = [
    { value: 1, label: "1 persona" },
    { value: 2, label: "2 personas" },
    { value: 3, label: "3 personas" },
    { value: 4, label: "4 o más personas" },
  ];

  const numberPeopleContributingCounts: { [key: string]: number } = {};
  usersMoreInfo.forEach(user => {
    const numberOfPeople = user.numberPeopleContributing!;
    numberPeopleContributingCounts[numberOfPeople] =
      (numberPeopleContributingCounts[numberOfPeople] || 0) + 1;
  });

  // Transformar el objeto en el formato deseado
  const resultNumberPeopleContributing: { [key: string]: number } = {};
  Object.keys(numberPeopleContributingCounts).forEach(numberOfPeople => {
    const formattedNumberOfPeople = numberPeopleContributingOptions.find(
      option => option.value === parseInt(numberOfPeople),
    )?.label;
    resultNumberPeopleContributing[formattedNumberOfPeople || ""] =
      numberPeopleContributingCounts[numberOfPeople];
  });

  return numberPeopleContributingCounts;
}

function getNumberPeopleDependFinanciallyCounts(usersMoreInfo: expectedType) {
  const numberPeopleOptions = [
    { value: 1, label: "1 persona" },
    { value: 2, label: "2 personas" },
    { value: 3, label: "3 personas" },
    { value: 4, label: "4 o más personas" },
    { value: 0, label: "Ninguna" },
  ];

  const numberPeopleCounts: { [key: string]: number } = {};
  usersMoreInfo.forEach(user => {
    const numberOfPeople = user.numberPeopleDependFinancially!;
    numberPeopleCounts[numberOfPeople] =
      (numberPeopleCounts[numberOfPeople] || 0) + 1;
  });

  // Transformar el objeto en el formato deseado
  const resultNumberPeople: { [key: string]: number } = {};
  Object.keys(numberPeopleCounts).forEach(numberOfPeople => {
    const formattedNumberOfPeople = numberPeopleOptions.find(
      option => option.value === parseInt(numberOfPeople),
    )?.label;
    resultNumberPeople[formattedNumberOfPeople || ""] =
      numberPeopleCounts[numberOfPeople];
  });

  return resultNumberPeople;
}

function getResidenceAreaCounts(usersMoreInfo: expectedType) {
  const residenceAreaCounts: { [key: string]: number } = {};
  usersMoreInfo.forEach(user => {
    const area = user.residenceArea!.toLowerCase();
    residenceAreaCounts[area] = (residenceAreaCounts[area] || 0) + 1;
  });

  // Transformar el objeto en el formato deseado con la primera letra en mayúscula
  const resultResidenceArea: { [key: string]: number } = {};
  Object.keys(residenceAreaCounts).forEach(area => {
    const formattedArea = area.charAt(0).toUpperCase() + area.slice(1);
    resultResidenceArea[formattedArea] = residenceAreaCounts[area];
  });

  return resultResidenceArea;
}

function getSocioeconomicLevelCounts(usersMoreInfo: expectedType) {
  const socioeconomicLevelOptions = [
    { value: 1, label: "Estrato 1" },
    { value: 2, label: "Estrato 2" },
    { value: 3, label: "Estrato 3" },
    { value: 4, label: "Estrato 4" },
    { value: 5, label: "Estrato 5" },
  ];

  const socioeconomicLevelCounts: { [key: string]: number } = {};
  usersMoreInfo.forEach(user => {
    const socioeconomicLevel = user.socioeconomicLevel!;
    socioeconomicLevelCounts[socioeconomicLevel] =
      (socioeconomicLevelCounts[socioeconomicLevel] || 0) + 1;
  });

  // Transformar el objeto en el formato deseado
  const resultSocioeconomicLevel: { [key: string]: number } = {};
  Object.keys(socioeconomicLevelCounts).forEach(socioeconomicLevel => {
    const formattedSocioeconomicLevel = socioeconomicLevelOptions.find(
      option => option.value === parseInt(socioeconomicLevel),
    )?.label;
    resultSocioeconomicLevel[formattedSocioeconomicLevel || ""] =
      socioeconomicLevelCounts[socioeconomicLevel];
  });

  return resultSocioeconomicLevel;
}

function getTypeOfHousingCounts(usersMoreInfo: expectedType) {
  const typeOfHousingCounts: { [key: string]: number } = {};
  usersMoreInfo.forEach(user => {
    const housingType = user.typeOfHousing!.toLowerCase();
    typeOfHousingCounts[housingType] =
      (typeOfHousingCounts[housingType] || 0) + 1;
  });

  // Transformar el objeto en el formato deseado con la primera letra en mayúscula
  const resultTypeOfHousing: { [key: string]: number } = {};
  Object.keys(typeOfHousingCounts).forEach(housingType => {
    const formattedHousingType =
      housingType.charAt(0).toUpperCase() + housingType.slice(1);
    resultTypeOfHousing[formattedHousingType] =
      typeOfHousingCounts[housingType];
  });

  return resultTypeOfHousing;
}

function getCharacterizationCounts(userMoreInfo: expectedType) {
  return {
    age: getAgeCounts(userMoreInfo),
    civilStatus: getCivilStatusCounts(userMoreInfo),
    educationLevel: getEducationLevelCounts(userMoreInfo),
    financialProducts: getFinancialProductsCounts(userMoreInfo),
    gender: getGenderCounts(userMoreInfo),
    healthSystemAffiliation: getHealthSystemAffiliationCounts(userMoreInfo),
    houseServices: getHouseServicesCounts(userMoreInfo),
    incomeComeFrom: getIncomeComeFromCounts(userMoreInfo),
    isInAPensionFund: getIsInAPensionFundCounts(userMoreInfo),
    numberPeopleContributing: getNumberPeopleContributingCounts(userMoreInfo),
    numberPeopleDependFinancially:
      getNumberPeopleDependFinanciallyCounts(userMoreInfo),
    residenceArea: getResidenceAreaCounts(userMoreInfo),
    socioeconomicLevel: getSocioeconomicLevelCounts(userMoreInfo),
    typeOfHousing: getTypeOfHousingCounts(userMoreInfo),
  };
}

type TCharacterizationCounts = ReturnType<typeof getCharacterizationCounts>;

export default getCharacterizationCounts;

export {
  getAgeCounts,
  getCharacterizationCounts,
  getCivilStatusCounts,
  getEducationLevelCounts,
  getFinancialProductsCounts,
  getGenderCounts,
  getHealthSystemAffiliationCounts,
  getHouseServicesCounts,
  getIncomeComeFromCounts,
  getIsInAPensionFundCounts,
  getNumberPeopleContributingCounts,
  getNumberPeopleDependFinanciallyCounts,
  getResidenceAreaCounts,
  getSocioeconomicLevelCounts,
  getTypeOfHousingCounts,
};

export type { TCharacterizationCounts, expectedType };
