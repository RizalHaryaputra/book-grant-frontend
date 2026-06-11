<template>
  <div
    class="flex min-h-screen w-full"
    style="background: radial-gradient(circle at 100% 0%, #CBB8A5 0%, #E4D8CA 30%, #F5F1EB 70%, #FAF8F5 100%);"
  >
    <Sidebar />

    <div class="flex-1 p-8 flex flex-col h-screen overflow-hidden">
      <TopNavbar title="Halaman Pemeriksaan Naskah" />

      <div class="mt-6 flex-1 bg-white border border-white/40 rounded-[28px] shadow-sm overflow-hidden flex flex-col">
        <div class="flex-1 overflow-y-auto custom-scrollbar">
          <table class="min-w-full text-left border-collapse" style="table-layout: fixed;">

            <!-- COLGROUP HARUS DI SINI, dalam table sebelum thead -->
            <colgroup>
              <col style="width: 28%;" />
              <col style="width: 14%;" />
              <col style="width: 22%;" />
              <col style="width: 16%;" />
              <col style="width: 20%;" />
            </colgroup>

            <thead class="sticky top-0 z-10">
  <tr style="border-bottom: 1.5px solid rgba(78,54,41,0.10); background: #ffffff;">
    <th style="padding: 18px 24px; font-family: 'Manrope', sans-serif; font-size: 13px; font-weight: 700; color: #4E3629; letter-spacing: 0.10em; text-transform: uppercase; background: #ffffff;">Judul Naskah</th>
    <th style="padding: 18px 16px; font-family: 'Manrope', sans-serif; font-size: 13px; font-weight: 700; color: #4E3629; letter-spacing: 0.10em; text-transform: uppercase; background: #ffffff;">Kategori</th>
    <th style="padding: 18px 16px; font-family: 'Manrope', sans-serif; font-size: 13px; font-weight: 700; color: #4E3629; letter-spacing: 0.10em; text-transform: uppercase; text-align: center; background: #ffffff;">Reviewer</th>
    <th style="padding: 18px 16px; font-family: 'Manrope', sans-serif; font-size: 13px; font-weight: 700; color: #4E3629; letter-spacing: 0.10em; text-transform: uppercase; background: #ffffff;">Tenggat</th>
    <th style="padding: 18px 16px; font-family: 'Manrope', sans-serif; font-size: 13px; font-weight: 700; color: #4E3629; letter-spacing: 0.10em; text-transform: uppercase; text-align: center; background: #ffffff;">Status</th>
  </tr>
</thead>

            <tbody>
              <tr
                v-for="item in pemeriksaanList"
                :key="item.id"
                style="border-bottom: 1px solid rgba(78,54,41,0.07); transition: background 0.15s;"
                class="hover:bg-white/20"
              >
                <!-- Judul -->
                <td style="padding: 22px 24px; font-family: 'Manrope', sans-serif; font-size: 14px; font-weight: 600; color: #1C1209; line-height: 1.35; word-break: break-word;">
                  {{ item.judul }}
                </td>

                <!-- Kategori -->
                <td style="padding: 22px 16px; font-family: 'Manrope', sans-serif; font-size: 13.5px; font-weight: 400; color: rgba(78,54,41,0.70);">
                  {{ item.kategori }}
                </td>

                <!-- Reviewer -->
                <td style="padding: 22px 16px; text-align: center;">
                  <div style="display: flex; flex-wrap: wrap; gap: 7px; justify-content: center; align-items: center;">
                    <template v-if="item.reviewers && item.reviewers.length > 0">
                      <span
                        v-for="reviewer in item.reviewers"
                        :key="reviewer"
                        style="display: inline-flex; align-items: center; background: #fff; border: 1.5px solid rgba(160,100,60,0.35); border-radius: 99px; padding: 5px 14px; font-family: 'Manrope', sans-serif; font-size: 12.5px; font-weight: 500; color: #5C3D28; white-space: nowrap;"
                      >{{ reviewer }}</span>
                    </template>
                    <template v-else>
                      <span style="display: inline-flex; align-items: center; background: transparent; border: 1.5px dashed rgba(143,128,115,0.50); border-radius: 99px; padding: 5px 14px; font-family: 'Manrope', sans-serif; font-size: 12px; font-weight: 400; color: rgba(143,128,115,0.80); white-space: nowrap;">
                        Belum ada Reviewer
                      </span>
                    </template>
                  </div>
                </td>

                <!-- Tenggat -->
                <td style="padding: 22px 16px; font-family: 'Manrope', sans-serif; font-size: 13.5px; font-weight: 400; color: rgba(78,54,41,0.70); white-space: nowrap;">
                  {{ item.tenggat }}
                </td>

                <!-- Status -->
                <td style="padding: 22px 16px; text-align: center;">
                  <span
                    :style="getStatusStyle(item.status)"
                    style="display: inline-flex; align-items: center; justify-content: center; border-radius: 99px; padding: 5px 16px; font-family: 'Manrope', sans-serif; font-size: 11.5px; white-space: nowrap;"
                  >{{ item.status }}</span>
                </td>
              </tr>
            </tbody>

          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import TopNavbar from '../components/TopNavbar.vue'

const pemeriksaanList = ref([
  { id: 1, 
    judul: 'Pemrograman Berorientasi Objek', 
    kategori: 'Buku Ajar', 
    reviewers: ['Dr. Arief', 'Prof. Rina'], 
    tenggat: '5 Juni 2026', 
    status: 'Lengkap' 
  },
  { id: 2, 
    judul: 'Algoritma dan Struktur Data', 
    kategori: 'Buku Referensi', 
    reviewers: ['Prof. Rina'], 
    tenggat: '5 Juni 2026', 
    status: 'Lengkap' 
  },
  { id: 3, 
    judul: 'Jaringan Komputer Dasar', 
    kategori: 'Buku Ajar', 
    reviewers: ['Prof. Rina'], 
    tenggat: '5 Juni 2026', 
    status: 'Sebagian' 
    },
  { id: 4, 
    judul: 'Basis Data Relasional', 
    kategori: 'Buku Referensi', 
    reviewers: [], 
    tenggat: '5 Juni 2026', 
    status: 'Belum diplot' 
  },
  { id: 5, 
    judul: 'Pemrograman Berorientasi Objek', 
    kategori: 'Buku Ajar', 
    reviewers: [], 
    tenggat: '5 Juni 2026', 
    status: 'Belum diplot' 
  },
  { id: 6, 
    judul: 'Pemrograman Web', 
    kategori: 'Buku Referensi', 
    reviewers: [], 
    tenggat: '5 Juni 2026', 
    status: 'Belum diplot' 
  },
  { id: 7, 
    judul: 'Data Mining', 
    kategori: 'Buku Ajar', 
    reviewers: [], 
    tenggat: '5 Juni 2026', 
    status: 'Belum diplot' 
  },
  { id: 8, 
    judul: 'Basis Data Relasional', 
    kategori: 'Buku Referensi', 
    reviewers: [], 
    tenggat: '5 Juni 2026', 
    status: 'Belum diplot' 
  },
  { id: 9, 
    judul: 'Basis Data Relasional', 
    kategori: 'Buku Referensi', 
    reviewers: [], 
    tenggat: '5 Juni 2026', 
    status: 'Belum diplot' 
  },
  { id: 10, 
    judul: 'Basis Data Relasional', 
    kategori: 'Buku Referensi', 
    reviewers: [], 
    tenggat: '5 Juni 2026', 
    status: 'Belum diplot' 
  },
  { id: 11, 
    judul: 'Basis Data Relasional', 
    kategori: 'Buku Referensi', 
    reviewers: [], 
    tenggat: '5 Juni 2026', 
    status: 'Belum diplot' 
  },
])

const getStatusStyle = (status) => {
  switch (status) {
    case 'Lengkap':
      return 'background: #DEF7EC; color: #0E9F6E; border: 1px solid #c3f0dc; font-weight: 600;'
    case 'Sebagian':
      return 'background: #DBEAFE; color: #1D4ED8; border: 1px solid #bfdbfe; font-weight: 600;'
    case 'Belum diplot':
      return 'background: transparent; color: #9B1C1C; font-weight: 600;'
    default:
      return 'background: #f3f4f6; color: #374151;'
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 7px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; border-radius: 99px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #B09A8A; border-radius: 99px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #4E3629; }
</style>