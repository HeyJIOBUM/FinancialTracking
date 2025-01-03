export default function Home() {
    return (
        <div className="flex min-h-[calc(calc(100vh)-100px)] items-center justify-center">
            <div className="max-w-[400px] rounded-lg border border-gray-200 bg-white p-4 shadow-md">
                <h1 className="mb-4 text-center text-3xl font-bold">Добро пожаловать в FinancialTracking!</h1>
                <p className="mb-6 text-center text-gray-700">
                    Управляйте своими финансами с легкостью. Контролируйте свои доходы и расходы,
                    а также составляйте бюджетные планы на различные периоды.
                </p>
            </div>
        </div>

    );
}