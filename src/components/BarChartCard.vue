<template>
  <div class="bg-white rounded-[24px] p-6 shadow-sm border border-[#4E3629]/5 flex flex-col" style="height: 300px;">
    <!-- Title -->
    <h2 class="text-[17px] font-bold text-center text-[#4C3427] mb-2" style="font-family: 'Manrope', sans-serif;">
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

// Plugin: menggambar angka statistik di atas setiap bar
const topLabelPlugin = {
  id: 'topLabel',
  afterDatasetsDraw(chart) {
    const { ctx } = chart
    ctx.save()
    chart.getDatasetMeta(0).data.forEach((bar, i) => {
      const value = chartData[i]
      ctx.fillStyle = '#4C3427'
      ctx.font = '700 12px Manrope, sans-serif'
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
        backgroundColor: '#4C3427',
        borderRadius: { topLeft: 6, topRight: 6 },
        borderSkipped: 'bottom',
        barPercentage: 0.45,
        categoryPercentage: 0.7,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true }, // Enable simple tooltip for interactions
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: {
            color: '#8F8073',
            font: { size: 10, family: 'Inter, sans-serif', weight: '500' },
          }
        },
        y: {
          min: 0,
          max: 60,
          ticks: {
            stepSize: 15,
            color: '#8F8073',
            font: { size: 10, family: 'Inter, sans-serif' },
          },
          grid: {
            color: '#EBE5DC',
            lineWidth: 1,
            drawTicks: false,
            borderDash: [4, 4],
          },
          border: {
            display: false,
          }
        }
      },
      layout: {
        padding: { top: 20, right: 8, bottom: 0, left: 0 }
      }
    },
  })
})
</script>