import PieStatic from "@/components/Statistics/Chart/PieStatic";
import CounterUserIntruments from "@/components/Statistics/Counter/CounterUserIntruments";
import chartData from "@/json/questions-characterization.json";
import { authOptions } from "@/libs/authOptions";
import { type TCharacterizationCounts } from "@/services/statisticts/instruments/characterization.service";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

async function getConsolidatedData(): Promise<
  TCharacterizationCounts & { [key: string]: string }
> {
  const request = await fetch(
    `${process.env.NEXTAUTH_URL}/api/statistics/instruments/characterization`,
  );
  return await request.json();
}

export default async function CharacterizationStatisticPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.email !== "admin@gmail.com") {
    redirect("/profile/user");
  }

  const data = await getConsolidatedData();

  return (
    <div>
      <div className="flex overflow-hidden">
        <div
          id="main-content"
          className="h-full w-full bg-gray-50 dark:bg-slate-800/20 py-20 relative overflow-y-auto lg:ml-64"
        >
          <main>
            <div className="pt-6 px-4">
              <CounterUserIntruments
                instrument="Instrumento de Caracterización"
                statistic="/characterization/counts"
              />

              <blockquote className="w-full flex items-center gap-3 text-3xl font-semibold leading-8 sm:leading-9 mt-16 mb-8 justify-center text-center">
                <h1 className="">
                  Estadísticas del instrumento de{" "}
                  <span className="text-sushi-500">Caracterización</span>
                </h1>
              </blockquote>

              <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
                {chartData.map(chart => (
                  <div
                    key={chart.key}
                    className="shadow dark:shadow-slate-700 mb-4 p-4 sm:p-6 h-full"
                  >
                    <PieStatic
                      title={{ text: chart.title, subtext: chart.subtext }}
                      data={data[chart.key]}
                    />
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
