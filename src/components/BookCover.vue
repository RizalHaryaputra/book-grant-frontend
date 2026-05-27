<template>
  <div
    class="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg select-none flex flex-col justify-between p-5 text-white"
    style="background: linear-gradient(135deg, #1C0C30 0%, #0F061C 50%, #080310 100%); border: 1.5px solid rgba(139, 92, 246, 0.25);"
  >
    <!-- Background Glows -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-violet-600/30 blur-[60px]"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-indigo-500/20 blur-[50px]"></div>
      <div class="absolute top-[30%] left-[25%] w-[50%] h-[50%] rounded-full bg-fuchsia-500/15 blur-[40px]"></div>
    </div>

    <!-- Title Section -->
    <div class="relative z-10 text-center pt-2">
      <h2
        class="text-[17px] font-extrabold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-violet-200 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
        style="font-family: 'Poppins', sans-serif;"
      >
        {{ title }}
      </h2>
    </div>

    <!-- Center Illustration (SVG Globe & Network) -->
    <div class="relative z-10 flex-1 flex items-center justify-center my-3">
      <!-- Glow effect behind illustration -->
      <div class="absolute w-[120px] h-[120px] rounded-full bg-violet-500/30 blur-[20px] animate-pulse"></div>

      <!-- High-tech Globe SVG -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        class="w-[140px] h-[140px] drop-shadow-[0_0_15px_rgba(139,92,246,0.6)]"
      >
        <!-- Orbit Lines -->
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(167, 139, 250, 0.15)" stroke-width="1" stroke-dasharray="2 3" />
        <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(167, 139, 250, 0.25)" stroke-width="0.75" />
        <ellipse cx="50" cy="50" rx="35" ry="12" fill="none" stroke="rgba(167, 139, 250, 0.3)" stroke-width="0.75" transform="rotate(30 50 50)" />
        <ellipse cx="50" cy="50" rx="35" ry="12" fill="none" stroke="rgba(167, 139, 250, 0.3)" stroke-width="0.75" transform="rotate(-30 50 50)" />

        <!-- Globe Base -->
        <circle cx="50" cy="50" r="22" fill="url(#globeGrad)" stroke="rgba(167, 139, 250, 0.6)" stroke-width="1.5" />

        <!-- Grid Lines -->
        <path d="M50,28 A22,22 0 0,0 50,72" fill="none" stroke="rgba(167, 139, 250, 0.4)" stroke-width="0.75" />
        <path d="M50,28 A22,22 0 0,1 50,72" fill="none" stroke="rgba(167, 139, 250, 0.4)" stroke-width="0.75" />
        <path d="M50,28 L50,72" fill="none" stroke="rgba(167, 139, 250, 0.4)" stroke-width="0.75" />
        <path d="M28,50 L72,50" fill="none" stroke="rgba(167, 139, 250, 0.4)" stroke-width="0.75" />
        <path d="M31.5,39 A22,22 0 0,0 68.5,39" fill="none" stroke="rgba(167, 139, 250, 0.3)" stroke-width="0.75" />
        <path d="M31.5,61 A22,22 0 0,0 68.5,61" fill="none" stroke="rgba(167, 139, 250, 0.3)" stroke-width="0.75" />

        <!-- Laptops & Network Nodes -->
        <!-- Center core glow -->
        <circle cx="50" cy="50" r="3" fill="#A78BFA" />

        <!-- Floating Node Dots -->
        <circle cx="15" cy="50" r="2" fill="#38BDF8" />
        <circle cx="85" cy="50" r="2" fill="#38BDF8" />
        <circle cx="50" cy="15" r="2" fill="#F472B6" />
        <circle cx="50" cy="85" r="2" fill="#F472B6" />
        <circle cx="24" cy="27" r="2" fill="#A78BFA" />
        <circle cx="76" cy="27" r="2" fill="#A78BFA" />
        <circle cx="24" cy="73" r="2" fill="#A78BFA" />
        <circle cx="76" cy="73" r="2" fill="#A78BFA" />

        <!-- Connection Lines to Nodes -->
        <line x1="50" y1="50" x2="15" y2="50" stroke="rgba(56, 189, 248, 0.4)" stroke-width="0.75" />
        <line x1="50" y1="50" x2="85" y2="50" stroke="rgba(56, 189, 248, 0.4)" stroke-width="0.75" />
        <line x1="50" y1="50" x2="50" y2="15" stroke="rgba(244, 114, 182, 0.4)" stroke-width="0.75" />
        <line x1="50" y1="50" x2="50" y2="85" stroke="rgba(244, 114, 182, 0.4)" stroke-width="0.75" />
        <line x1="50" y1="50" x2="24" y2="27" stroke="rgba(167, 139, 250, 0.4)" stroke-width="0.75" />
        <line x1="50" y1="50" x2="76" y2="27" stroke="rgba(167, 139, 250, 0.4)" stroke-width="0.75" />

        <!-- Node Halo Rings -->
        <circle cx="15" cy="50" r="4.5" fill="none" stroke="#38BDF8" stroke-width="0.5" stroke-dasharray="1 1" />
        <circle cx="85" cy="50" r="4.5" fill="none" stroke="#38BDF8" stroke-width="0.5" stroke-dasharray="1 1" />
        <circle cx="50" cy="15" r="4.5" fill="none" stroke="#F472B6" stroke-width="0.5" stroke-dasharray="1 1" />

        <!-- Gradient Definition -->
        <defs>
          <radialGradient id="globeGrad" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
            <stop offset="0%" stop-color="#8B5CF6" />
            <stop offset="70%" stop-color="#4C1D95" />
            <stop offset="100%" stop-color="#1E1B4B" />
          </radialGradient>
        </defs>
      </svg>
    </div>

    <!-- Author Section -->
    <div class="relative z-10 text-center pb-1">
      <div class="w-12 h-[1px] bg-violet-400/40 mx-auto mb-2"></div>
      <p
        class="text-[10px] font-medium tracking-wide text-violet-200/80 uppercase"
        style="font-family: 'Manrope', sans-serif;"
      >
        {{ author }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "DASAR JARINGAN KOMPUTER"
  },
  author: {
    type: String,
    default: "Ihsanul Fikri, M.Kom"
  }
});
</script>

<style scoped>
/* Minor animation to give high tech feel */
svg {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-4px) rotate(2deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
}
</style>
