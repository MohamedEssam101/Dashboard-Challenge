"use client";

import { useFetchData } from "@/hooks/useFetchData";
import { getWeather } from "@/services/weather";
import { SectionLoading } from "../ui/section-loading";
import { SectionError } from "../ui/section-error";

interface WeatherMetricProps {
	label: string;
	value: string;
}

export function WeatherSection() {
	// Load the weather card independently from the rest of the dashboard.
	const { data, isLoading, error } = useFetchData(
		getWeather,
		"Failed to load weather data",
	);
	if (isLoading) {
		// Show a full section skeleton while the weather request is pending.
		return <SectionLoading title="Weather" />;
	}
	if (error || !data) {
		// Show the shared section error if the request fails or returns no data.
		return <SectionError title="Weather" message={error} />;
	}

	// Format the API date once before rendering it in the hero area.
	const formattedDate = new Intl.DateTimeFormat("en", {
		weekday: "long",
		month: "short",
		day: "numeric",
	}).format(new Date(data.date));

	return (
		<section className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
			{/* Hero area with the current location, day state, and temperature. */}
			<div className="bg-linear-to-br from-sky-500 via-blue-600 to-indigo-700 p-5 text-white dark:from-sky-700 dark:via-blue-800 dark:to-indigo-950">
				<div className="flex items-start justify-between gap-4">
					<div>
						<p className="text-sm font-medium text-sky-100">Cairo weather</p>
						<h2 className="mt-1 text-2xl font-semibold">Current weather</h2>
					</div>
					<div className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur">
						{data.isDay ? "Day" : "Night"}
					</div>
				</div>

				<div className="mt-8 flex items-end justify-between gap-4">
					<div>
						<p className="text-6xl font-semibold tracking-tight">
							{Math.round(data.temperature)}
							<span className="text-3xl">{data.temperatureUnit}</span>
						</p>
						<p className="mt-2 text-sm text-sky-100">{formattedDate}</p>
					</div>
					<div className="hidden h-20 w-20 rounded-full bg-white/20 shadow-inner shadow-white/20 sm:block" />
				</div>
			</div>

			{/* Small supporting weather metrics. */}
			<div className="grid gap-3 p-4 sm:grid-cols-3">
				<WeatherMetric
					label="High / Low"
					value={`${Math.round(data.maxTemperature)}${data.temperatureUnit} / ${Math.round(data.minTemperature)}${data.temperatureUnit}`}
				/>
				<WeatherMetric
					label="Wind speed"
					value={`${data.windSpeed} ${data.windSpeedUnit}`}
				/>
				<WeatherMetric
					label="Wind direction"
					value={`${data.windDirection}${data.windDirectionUnit}`}
				/>
			</div>

			{/* API timezone metadata. */}
			<div className="border-t border-zinc-200 px-4 py-3 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
				Timezone: {data.timezone}
			</div>
		</section>
	);
}

// Reusable metric tile for the weather details grid.
function WeatherMetric({ label, value }: WeatherMetricProps) {
	return (
		<div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/50">
			<p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
				{label}
			</p>
			<p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
				{value}
			</p>
		</div>
	);
}
