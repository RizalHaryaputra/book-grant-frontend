<script setup>
defineProps({
  users: Array,
})

defineEmits([
  'edit',
  'delete',
])
</script>

<template>
  <div class="overflow-x-auto mt-8">
    <table class="w-full">
      <thead>
        <tr class="border-b">
          <th class="text-left py-4">
            Nama
          </th>

          <th class="text-left">
            Email
          </th>

          <th class="text-left">
            Role
          </th>

          <th class="text-left">
            Status
          </th>

          <th class="text-left">
            Aksi
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(
            user, index
          ) in users"
          :key="index"
          class="border-b"
        >
          <td class="py-5">
            {{ user.name }}
          </td>

          <td>
            {{ user.email }}
          </td>

          <td>
            {{ user.role }}
          </td>

          <td>
            {{ user.status }}
          </td>

          <td>
            <div class="flex gap-3">
              <button
                @click="
                  $emit(
                    'edit',
                    index
                  )
                "
                class="px-4 py-2 border rounded-xl"
              >
                Edit
              </button>

              <button
                @click="
                  $emit(
                    'delete',
                    index
                  )
                "
                class="px-4 py-2 bg-red-500 text-white rounded-xl"
              >
                Hapus
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
