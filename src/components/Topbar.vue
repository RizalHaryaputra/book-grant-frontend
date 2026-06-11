<template>

  <div class="topbar">

    <h2>{{ title }}</h2>

    <div class="search-box">

      <input
        type="text"
        :placeholder="placeholder"
      />

    </div>

    <div class="profile">

      <div class="profile-text">

        <h4>Hafizh</h4>
        <p>Penulis</p>

      </div>

      <img
        src="https://i.pravatar.cc/40"
        alt=""
      />

    </div>

  </div>

</template>

<script setup>

defineProps({
  title: String,
  placeholder: String
})

</script>

<style scoped>

.topbar{
  background:white;
  border-radius:18px;
  padding:18px 25px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-bottom:20px;
}

.topbar h2{
  font-size:28px;
  color:#35261d;
}

.search-box{
  flex:1;
  margin:0 40px;
}

.search-box input{
  width:100%;
  padding:14px 18px;
  border:none;
  background:#f5f1eb;
  border-radius:12px;
  outline:none;
}

.profile{
  display:flex;
  align-items:center;
  gap:12px;
}

.profile-text{
  text-align:right;
}

.profile-text h4{
  font-size:14px;
}

.profile-text p{
  font-size:12px;
  color:gray;
}

.profile img{
  width:42px;
  height:42px;
  border-radius:50%;
}

</style>
