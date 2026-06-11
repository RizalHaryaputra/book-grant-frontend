<template>
  <div class="reviewer-card">

    <div class="card-top">

      <img
        :src="image"
        alt=""
        class="reviewer-image"
      />

      <div class="rating">
        ⭐ {{ rating }}
      </div>

    </div>

    <div class="reviewer-info">

      <h2>{{ name }}</h2>

      <p class="category">
        {{ category }}
      </p>

    </div>

    <div class="tags">

      <span
        v-for="tag in tags"
        :key="tag"
        class="tag"
      >
        {{ tag }}
      </span>

    </div>

    <button class="profile-btn">
      Lihat Profil
    </button>

    <button class="request-btn">
      Kirim Permintaan
    </button>

  </div>
</template>

<script setup>

defineProps({
  name: String,
  category: String,
  rating: String,
  image: String,
  tags: Array
})

</script>

<style scoped>

.reviewer-card{
  background:white;
  border:1px solid #e7dfd6;
  border-radius:14px;
  padding:20px;
}

.card-top{
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  margin-bottom:20px;
}

.reviewer-image{
  width:70px;
  height:70px;
  border-radius:12px;
  object-fit:cover;
}

.rating{
  font-size:14px;
  color:#5a4031;
  font-weight:600;
}

.reviewer-info h2{
  font-size:30px;
  color:#35261d;
  margin-bottom:8px;
}

.category{
  color:#777;
  margin-bottom:20px;
}

.tags{
  display:flex;
  gap:10px;
  margin-bottom:25px;
  flex-wrap:wrap;
}

.tag{
  background:#eef3e6;
  color:#60774c;
  padding:7px 12px;
  border-radius:8px;
  font-size:12px;
}

.profile-btn{
  width:100%;
  border:none;
  background:#3f2617;
  color:white;
  padding:14px;
  border-radius:10px;
  margin-bottom:12px;
  cursor:pointer;
}

.request-btn{
  width:100%;
  border:1px solid #cfcfcf;
  background:white;
  padding:14px;
  border-radius:10px;
  cursor:pointer;
}

</style>
