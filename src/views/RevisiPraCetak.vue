<template>
  <div class="container mt-4">

    <h3>Revisi Pra-Cetak</h3>

    <div v-if="loading" class="alert alert-info">
      Memuat data...
    </div>

    <div v-if="publisherCheck">

      <div class="card mb-4">
        <div class="card-header">
          Hasil Pemeriksaan Penerbit
        </div>

        <div class="card-body">

          <p>
            <strong>Cover:</strong>
            <span
              :class="
                publisherCheck.cover_ok
                  ? 'text-success'
                  : 'text-danger'
              "
            >
              {{ publisherCheck.cover_ok ? 'Sesuai' : 'Perlu Revisi' }}
            </span>
          </p>

          <p>
            <strong>Jumlah Halaman:</strong>
            <span
              :class="
                publisherCheck.page_count_ok
                  ? 'text-success'
                  : 'text-danger'
              "
            >
              {{ publisherCheck.page_count_ok ? 'Sesuai' : 'Perlu Revisi' }}
            </span>
          </p>

          <p>
            <strong>Dokumen Administrasi:</strong>
            <span
              :class="
                publisherCheck.admin_docs_ok
                  ? 'text-success'
                  : 'text-danger'
              "
            >
              {{ publisherCheck.admin_docs_ok ? 'Lengkap' : 'Belum Lengkap' }}
            </span>
          </p>

          <hr>

          <p>
            <strong>Keputusan:</strong>

            <span
              class="badge bg-warning"
              v-if="publisherCheck.decision === 'revised'"
            >
              Revisi Diperlukan
            </span>

            <span
              class="badge bg-success"
              v-if="publisherCheck.decision === 'approved'"
            >
              Disetujui
            </span>
          </p>

          <p>
            <strong>Catatan:</strong>
          </p>

          <div class="alert alert-secondary">
            {{ publisherCheck.notes }}
          </div>

        </div>
      </div>

      <div
        class="card"
        v-if="publisherCheck.decision === 'revised'"
      >
        <div class="card-header">
          Upload Revisi Pra-Cetak
        </div>

        <div class="card-body">

          <div class="mb-3">
            <label class="form-label">
              File Revisi
            </label>

            <input
              type="file"
              class="form-control"
              @change="handleFile"
            >
          </div>

          <div class="mb-3">
            <label class="form-label">
              Catatan Revisi
            </label>

            <textarea
              v-model="revisionNote"
              class="form-control"
              rows="4"
            />
          </div>

          <button
            class="btn btn-primary"
            @click="uploadRevision"
          >
            Upload Revisi
          </button>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {

  name: 'RevisiPraCetak',

  data() {
    return {
      manuscriptId: 8,
      publisherCheck: null,
      revisionFile: null,
      revisionNote: '',
      loading: false
    }
  },

  mounted() {
    this.loadPublisherCheck()
  },

  methods: {

    async loadPublisherCheck() {

      try {

        this.loading = true

        const response = await axios.get(
          `http://127.0.0.1:8000/api/author/manuscripts/${this.manuscriptId}/publisher-check`
        )

        this.publisherCheck = response.data.data

      } catch (error) {

        console.error(error)

      } finally {

        this.loading = false

      }
    },

    handleFile(event) {

      this.revisionFile =
        event.target.files[0]
    },

    async uploadRevision() {

      try {

        const formData = new FormData()

        formData.append(
          'revision_file',
          this.revisionFile
        )

        formData.append(
          'revision_note',
          this.revisionNote
        )

        const response =
          await axios.post(
            `http://127.0.0.1:8000/api/author/manuscripts/${this.manuscriptId}/preprint-revision`,
            formData,
            {
              headers: {
                'Content-Type':
                  'multipart/form-data'
              }
            }
          )

        alert(response.data.message)

      } catch (error) {

        alert(
          error.response?.data?.message ||
          'Gagal upload revisi'
        )
      }
    }
  }
}
</script>