import { db } from "@/libs/prismaDB";
import * as CharacterizationSrv from "@/services/statisticts/instruments/characterization.service";
import { NextResponse } from "next/server";

export async function GET() {
  const usersMoreInfo = await db.userMoreInfo.findMany({
    select: {
      age: true,
      civilStatus: true,
      educationLevel: true,
      financialProducts: true,
      gender: true,
      healthSystemAffiliation: true,
      houseServices: true,
      incomeComeFrom: true,
      isInAPensionFund: true,
      numberPeopleContributing: true,
      numberPeopleDependFinancially: true,
      residenceArea: true,
      socioeconomicLevel: true,
      typeOfHousing: true,
    },
  });

  const characterizationQuestionStatistics =
    CharacterizationSrv.default(usersMoreInfo);

  return NextResponse.json(characterizationQuestionStatistics);
}
