'use client'

export default function Error({error, reset}) {
    const handleErrorReset = () => {
        window.location.reload();
    }

    return (
        <div
            className="flex flex-col items-center justify-center rounded-lg border border-red-500 bg-red-50 p-6 text-red-700">
            <h2 className="mb-4 text-lg font-bold">Something went wrong!</h2>
            <button
                onClick={handleErrorReset}
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
                Try again
            </button>
        </div>
    );
}