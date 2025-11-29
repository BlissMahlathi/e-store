"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface ChartCardProps {
  title: string;
  labels: string[];
  dataset: number[];
  accentColor?: string;
}

export function ChartCard({ title, labels, dataset, accentColor = "#181818" }: ChartCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Line
          data={{
            labels,
            datasets: [
              {
                data: dataset,
                borderColor: accentColor,
                backgroundColor: `${accentColor}20`,
                tension: 0.4,
                fill: true,
              },
            ],
          }}
          options={{
            plugins: { legend: { display: false } },
            scales: { y: { display: false }, x: { display: false } },
            responsive: true,
          }}
        />
      </CardContent>
    </Card>
  );
}
