<template>
  <div class="bg-[#F3EEE7] rounded-3xl p-6 flex flex-col" style="height: 380px;">
    <!-- Title -->
    <h2 class="text-xl font-bold text-center text-[#1C1209] mb-4">
      Status Distribusi Naskah
    </h2>

    <!-- Chart -->
    <div class="flex-1 relative min-h-0">
      <canvas ref="chartRef"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from 'chart.js'

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip)

const chartRef = ref(null)

const chartData = [45, 32, 17, 10, 5]
const labels = ['Draft', 'Under Review', 'Revision', 'Preprint', 'Ready to Print']

// Plugin: angka di atas bar
const topLabelPlugin = {
  id: 'topLabel',
  afterDatasetsDraw(chart) {
    const { ctx } = chart
    ctx.save()
    chart.getDatasetMeta(0).data.forEach((bar, i) => {
      const value = chartData[i]
      ctx.fillStyle = '#3A2820'
      ctx.font = '600 13px Inter, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'bottom'
      ctx.fillText(value, bar.x, bar.y - 6)
    })
    ctx.restore()
  }
}

onMounted(() => {
  const ctx = chartRef.value.getContext('2d')

  new Chart(ctx, {
    type: 'bar',
    plugins: [topLabelPlugin],
    data: {
      labels,
      datasets: [{
        data: chartData,
        backgroundColor: '#3A2820',
        borderRadius: { topLeft: 8, topRight: 8 },
        borderSkipped: 'bottom',
        barPercentage: 0.55,
        categoryPercentage: 0.7,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: {
            color: '#3A2820',
            font: { size: 12, family: 'Inter, sans-serif' },
          }
        },
        y: {
          min: 0,
          max: 60,
          ticks: {
            stepSize: 15,
            color: '#7A6A5A',
            font: { size: 12, family: 'Inter, sans-serif' },
          },
          grid: {
            color: 'rgba(100,80,60,0.2)',
            lineWidth: 1,
            drawTicks: false,
          },
          border: {
            display: false,
            dash: [5, 5],
          }
        }
      },
      layout: {
        padding: { top: 30, right: 12, bottom: 0, left: 0 }
      }
    },
  })
})
</script>