<template>
  <div
    class="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
  >

    <div
      class="bg-white w-full max-w-xl rounded-[32px] p-8"
    >

      <div class="flex justify-between items-center mb-8">

        <h1 class="text-3xl font-bold">
          {{ isEdit ? "Edit User" : "Tambah User" }}
        </h1>

        <button
          @click="$emit('close')"
          class="text-2xl"
        >
          ×
        </button>

      </div>

      <form
        class="space-y-5"
        @submit.prevent="submitForm"
      >

        <div>

          <label class="block mb-2 font-semibold">
            Nama
          </label>

          <input
            v-model="form.name"
            type="text"
            class="w-full border rounded-2xl px-5 py-4 outline-none"
          />

        </div>

        <div>

          <label class="block mb-2 font-semibold">
            Email
          </label>

          <input
            v-model="form.email"
            type="email"
            class="w-full border rounded-2xl px-5 py-4 outline-none"
          />

        </div>

        <div>

          <label class="block mb-2 font-semibold">
            Role
          </label>

          <select
            v-model="form.role"
            class="w-full border rounded-2xl px-5 py-4 outline-none"
          >

            <option>Admin</option>
            <option>Penulis</option>
            <option>Penerbit</option>
            <option>Reviewer</option>

          </select>

        </div>

        <div>

          <label class="block mb-2 font-semibold">
            Status
          </label>

          <select
            v-model="form.status"
            class="w-full border rounded-2xl px-5 py-4 outline-none"
          >

            <option>Aktif</option>
            <option>Nonaktif</option>

          </select>

        </div>

        <button
          type="submit"
          class="w-full bg-primary text-white py-4 rounded-2xl font-semibold"
        >
          {{ isEdit ? "Update User" : "Tambah User" }}
        </button>

      </form>

    </div>

  </div>
</template>

<script setup>
import { reactive, watch } from "vue"

const props = defineProps({
  user: Object,
  isEdit: Boolean,
})

const emit = defineEmits([
  "save",
  "close",
])

const form = reactive({
  id: null,
  name: "",
  email: "",
  role: "Penulis",
  status: "Aktif",
})

watch(
  () => props.user,
  (newUser) => {

    if (newUser) {

      form.id = newUser.id
      form.name = newUser.name
      form.email = newUser.email
      form.role = newUser.role
      form.status = newUser.status

    }

  },
  { immediate: true }
)

const submitForm = () => {
  emit("save", { ...form })
}
</script>