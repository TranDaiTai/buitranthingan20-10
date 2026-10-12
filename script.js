/**
 * THIỆP ĐIỆN TỬ 20/10: NGÔI SAO NHỎ – NGÀN LỜI YÊU THƯƠNG
 * Tác phẩm dự thi: Hội thi sáng tạo sản phẩm số “Chạm công nghệ – Chạm trái tim”
 * Trường THCS Thuận Kiều
 * 100% Vanilla JavaScript - Tương thích GitHub Pages
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. KHỞI TẠO VÀ LẤY THAM CHIẾU CÁC PHẦN TỬ DOM
  // =========================================================================
  const screenEnvelope = document.getElementById('screen-envelope');
  const envelope = document.getElementById('envelope');
  const openCardBtn = document.getElementById('open-card-btn');
  const waxSeal = document.getElementById('wax-seal');
  const mainCardExperience = document.getElementById('main-card-experience');

  const musicToggle = document.getElementById('music-toggle');
  const musicTooltip = document.getElementById('music-tooltip');
  const bgAudio = document.getElementById('bg-audio');

  const effectsToggle = document.getElementById('effects-toggle');
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  const showAllTextBtn = document.getElementById('show-all-text-btn');
  const readingHint = document.getElementById('reading-hint');
  const revealItems = document.querySelectorAll('.reveal-item');

  const mainShareBtn = document.getElementById('main-share-btn');
  const endShareBtn = document.getElementById('end-share-btn');
  const replayCardBtn = document.getElementById('replay-card-btn');

  const modalContainer = document.getElementById('modal-container');
  const cardActionBtns = document.querySelectorAll('.card-action-btn');
  const modalCloseBtns = document.querySelectorAll('.modal-close-btn');
  const modalCancelBtns = document.querySelectorAll('.modal-cancel-btn');
  const copyBtns = document.querySelectorAll('.btn-copy');

  const toastNotification = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');

  let toastTimeout = null;
  let isEnvelopeOpened = false;
  let sequentialTimer = null;

  // =========================================================================
  // 2. MỞ PHONG BÌ & CHUYỂN CẢNH (MÀN HÌNH 1 -> MÀN HÌNH 2)
  // =========================================================================
  function openEnvelope() {
    if (isEnvelopeOpened) return;
    isEnvelopeOpened = true;

    // 1. Thêm class kích hoạt animation mở cánh phong bì và nhô bức thư
    if (envelope) {
      envelope.classList.add('open');
    }

    // 2. Sau khi animation phong bì hoàn tất, làm mờ màn hình 1 và hiển thị thiệp chính
    setTimeout(() => {
      screenEnvelope.classList.add('fade-out');
      
      setTimeout(() => {
        screenEnvelope.style.display = 'none';
        mainCardExperience.classList.remove('hidden');
        
        // Kích hoạt hiển thị mềm mại
        requestAnimationFrame(() => {
          mainCardExperience.style.opacity = '1';
          const heroSec = document.getElementById('screen-hero');
          if (heroSec) {
            heroSec.scrollIntoView({ behavior: 'smooth' });
          }
        });

        // Bắt đầu quan sát để hiển thị tuần tự bức thư
        initSequentialLetterReveal();
      }, 500);
    }, 700);
  }

  if (openCardBtn) {
    openCardBtn.addEventListener('click', openEnvelope);
  }
  if (waxSeal) {
    waxSeal.addEventListener('click', openEnvelope);
  }
  if (envelope) {
    envelope.addEventListener('click', (e) => {
      if (!isEnvelopeOpened) openEnvelope();
    });
    envelope.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && !isEnvelopeOpened) {
        e.preventDefault();
        openEnvelope();
      }
    });
  }

  // =========================================================================
  // 3. HIỂN THỊ TUẦN TỰ NỘI DUNG BỨC THƯ (MÀN HÌNH 3)
  // =========================================================================
  let currentRevealIndex = 0;
  let hasAutoRevealed = false;

  function showAllLetterParagraphs() {
    if (sequentialTimer) {
      clearInterval(sequentialTimer);
      sequentialTimer = null;
    }
    revealItems.forEach((item) => {
      item.classList.add('revealed');
    });
    if (readingHint) {
      readingHint.textContent = 'Đã hiển thị toàn bộ nội dung';
    }
    if (showAllTextBtn) {
      showAllTextBtn.style.display = 'none';
    }
  }

  function startSequentialReveal() {
    if (hasAutoRevealed) return;
    hasAutoRevealed = true;

    currentRevealIndex = 0;
    sequentialTimer = setInterval(() => {
      if (currentRevealIndex < revealItems.length) {
        revealItems[currentRevealIndex].classList.add('revealed');
        currentRevealIndex++;
      } else {
        clearInterval(sequentialTimer);
        sequentialTimer = null;
        if (readingHint) {
          readingHint.textContent = 'Đã hoàn tất lời chúc từ trái tim ♡';
        }
      }
    }, 1200);
  }

  function initSequentialLetterReveal() {
    const letterSection = document.getElementById('screen-letter');
    if (!letterSection) return;

    // Sử dụng IntersectionObserver để tự động kích hoạt khi người dùng cuộn đến bức thư
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAutoRevealed) {
              startSequentialReveal();
              observer.disconnect();
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(letterSection);
    } else {
      // Trình duyệt cũ hơn: Hiển thị ngay
      showAllLetterParagraphs();
    }
  }

  if (showAllTextBtn) {
    showAllTextBtn.addEventListener('click', showAllLetterParagraphs);
  }

  // =========================================================================
  // 4. HỆ THỐNG ÂM NHẠC & SYNTHESIZER DỊU NHẸ DỰ PHÒNG
  // =========================================================================
  let isPlayingMusic = false;
  let audioContext = null;
  let synthInterval = null;
  let isUsingSynthFallback = false;

  // Giai điệu hộp âm nhạc (Music Box Lullaby) êm dịu nếu chưa có file assets/music.mp3
  const lullabyNotes = [
    { freq: 523.25, dur: 0.5 }, // C5
    { freq: 659.25, dur: 0.5 }, // E5
    { freq: 783.99, dur: 0.6 }, // G5
    { freq: 880.00, dur: 0.8 }, // A5
    { freq: 783.99, dur: 0.5 }, // G5
    { freq: 659.25, dur: 0.6 }, // E5
    { freq: 587.33, dur: 0.5 }, // D5
    { freq: 523.25, dur: 1.0 }, // C5
    { freq: 659.25, dur: 0.5 }, // E5
    { freq: 783.99, dur: 0.5 }, // G5
    { freq: 1046.50, dur: 0.9 }, // C6
    { freq: 880.00, dur: 0.6 }, // A5
    { freq: 783.99, dur: 0.7 }, // G5
    { freq: 659.25, dur: 0.6 }, // E5
    { freq: 587.33, dur: 0.8 }, // D5
    { freq: 523.25, dur: 1.2 }  // C5
  ];

  function playSynthNote(freq, duration) {
    if (!audioContext || audioContext.state === 'suspended') return;
    try {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioContext.currentTime);

      gain.gain.setValueAtTime(0, audioContext.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, audioContext.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start();
      osc.stop(audioContext.currentTime + duration);
    } catch (e) {
      console.warn('Audio Context error:', e);
    }
  }

  function startMusicBox() {
    isUsingSynthFallback = true;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioContext) {
      audioContext = new AudioContextClass();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    let noteIdx = 0;
    function playNext() {
      if (!isPlayingMusic) return;
      const note = lullabyNotes[noteIdx];
      playSynthNote(note.freq, note.dur);
      noteIdx = (noteIdx + 1) % lullabyNotes.length;
      synthInterval = setTimeout(playNext, note.dur * 850 + 200);
    }
    playNext();
  }

  function stopMusicBox() {
    if (synthInterval) {
      clearTimeout(synthInterval);
      synthInterval = null;
    }
  }

  function toggleMusic() {
    if (!isPlayingMusic) {
      // Người dùng yêu cầu bật nhạc
      if (bgAudio && bgAudio.src) {
        const playPromise = bgAudio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              isPlayingMusic = true;
              updateMusicButtonUI(true);
            })
            .catch(() => {
              // File mp3 chưa sẵn sàng hoặc lỗi: Tự động dùng Music Box êm dịu
              startMusicBox();
              isPlayingMusic = true;
              updateMusicButtonUI(true);
            });
        } else {
          startMusicBox();
          isPlayingMusic = true;
          updateMusicButtonUI(true);
        }
      } else {
        startMusicBox();
        isPlayingMusic = true;
        updateMusicButtonUI(true);
      }
    } else {
      // Tắt nhạc
      isPlayingMusic = false;
      if (bgAudio) {
        bgAudio.pause();
      }
      stopMusicBox();
      updateMusicButtonUI(false);
    }
  }

  function updateMusicButtonUI(playing) {
    if (playing) {
      musicToggle.classList.add('playing');
      musicToggle.classList.add('active');
      musicToggle.setAttribute('aria-label', 'Tắt nhạc nền');
      if (musicTooltip) musicTooltip.textContent = 'Tắt nhạc nền';
    } else {
      musicToggle.classList.remove('playing');
      musicToggle.classList.remove('active');
      musicToggle.setAttribute('aria-label', 'Bật nhạc nền');
      if (musicTooltip) musicTooltip.textContent = 'Bật nhạc nền';
    }
  }

  if (musicToggle) {
    musicToggle.addEventListener('click', toggleMusic);
  }

  // =========================================================================
  // 5. CÁC MODAL LỜI CHÚC TƯƠNG TÁC (MÀN HÌNH 4)
  // =========================================================================
  let lastActiveElement = null;

  function openWishModal(modalId) {
    lastActiveElement = document.activeElement;
    const targetModal = document.getElementById(modalId);
    if (!targetModal || !modalContainer) return;

    // Ẩn tất cả các modal trước
    document.querySelectorAll('.modal-dialog').forEach((m) => m.classList.add('hidden'));

    modalContainer.classList.remove('hidden');
    modalContainer.setAttribute('aria-hidden', 'false');
    targetModal.classList.remove('hidden');

    // Chuyển focus vào nút đóng modal
    const closeBtn = targetModal.querySelector('.modal-close-btn');
    if (closeBtn) closeBtn.focus();

    document.body.style.overflow = 'hidden';
  }

  function closeAllModals() {
    if (!modalContainer) return;
    modalContainer.classList.add('hidden');
    modalContainer.setAttribute('aria-hidden', 'true');
    document.querySelectorAll('.modal-dialog').forEach((m) => m.classList.add('hidden'));
    document.body.style.overflow = '';

    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  }

  cardActionBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      if (targetId) openWishModal(targetId);
    });
  });

  modalCloseBtns.forEach((btn) => {
    btn.addEventListener('click', closeAllModals);
  });

  modalCancelBtns.forEach((btn) => {
    btn.addEventListener('click', closeAllModals);
  });

  if (modalContainer) {
    modalContainer.addEventListener('click', (e) => {
      if (e.target === modalContainer) {
        closeAllModals();
      }
    });
  }

  // Đóng modal khi nhấn phím Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer && !modalContainer.classList.contains('hidden')) {
      closeAllModals();
    }
  });

  // =========================================================================
  // 6. TÍNH NĂNG CHIA SẺ & SAO CHÉP (WEB SHARE API / CLIPBOARD)
  // =========================================================================
  function showToast(message) {
    if (!toastNotification || !toastMessage) return;
    toastMessage.textContent = message;
    toastNotification.classList.remove('hidden');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastNotification.classList.add('hidden');
    }, 3500);
  }

  function copyTextToClipboard(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => showToast(successMsg),
        () => fallbackCopyText(text, successMsg)
      );
    } else {
      fallbackCopyText(text, successMsg);
    }
  }

  function fallbackCopyText(text, successMsg) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(successMsg);
    } catch (err) {
      showToast('Không thể sao chép tự động. Vui lòng chọn và sao chép thủ công!');
    }
    document.body.removeChild(textArea);
  }

  function handleShareCard() {
    const shareData = {
      title: 'Ngôi sao nhỏ – Ngàn lời yêu thương | Chúc mừng 20/10',
      text: 'Mời bạn mở tấm thiệp điện tử chúc mừng Ngày Phụ nữ Việt Nam 20/10 đong đầy yêu thương!',
      url: window.location.href
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData).catch((err) => {
        if (err.name !== 'AbortError') {
          copyTextToClipboard(window.location.href, 'Đã sao chép liên kết thiệp yêu thương! Hãy dán để gửi nhé ♡');
        }
      });
    } else {
      copyTextToClipboard(
        window.location.href,
        'Đã sao chép liên kết thiệp 20/10! Hãy dán vào tin nhắn Zalo, Facebook để gửi người bạn thương yêu ♡'
      );
    }
  }

  if (mainShareBtn) {
    mainShareBtn.addEventListener('click', handleShareCard);
  }
  if (endShareBtn) {
    endShareBtn.addEventListener('click', handleShareCard);
  }

  // Sao chép nội dung lời chúc trong modal
  copyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-copy-target');
      const modal = document.getElementById(modalId);
      if (modal) {
        const bodyText = modal.querySelector('.modal-body')?.innerText || '';
        copyTextToClipboard(bodyText, 'Đã sao chép toàn bộ lời chúc! Bạn có thể dán vào tin nhắn ngay ♡');
      }
    });
  });

  // Nút xem lại thiệp ở màn hình cuối
  if (replayCardBtn) {
    replayCardBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Nút cuộn lên đầu trang
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.remove('hidden');
    } else {
      scrollTopBtn.classList.add('hidden');
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =========================================================================
  // 7. CANVAS HIỆU ỨNG CÁNH HOA & TRÁI TIM BAY (PETAL CANVAS)
  // =========================================================================
  const canvas = document.getElementById('petal-canvas');
  let ctx = null;
  let particles = [];
  let animationFrameId = null;
  let isEffectsActive = true;

  // Kiểm tra cấu hình prefers-reduced-motion của người dùng
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  class Particle {
    constructor(w, h) {
      this.reset(w, h, true);
    }

    reset(w, h, initial = false) {
      this.x = Math.random() * w;
      this.y = initial ? Math.random() * h : -20;
      this.size = Math.random() * 12 + 8;
      this.speedY = Math.random() * 1.4 + 0.6;
      this.speedX = (Math.random() - 0.5) * 1.0;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.03;
      this.opacity = Math.random() * 0.5 + 0.4;
      this.oscillation = Math.random() * 100;
      this.type = Math.random() > 0.35 ? 'petal' : 'heart'; // 65% cánh hoa, 35% trái tim
      
      // Màu sắc pastel nhẹ nhàng
      const colors = ['#F16B85', '#F8DDE5', '#C92D5A', '#FFAEC0', '#FFFFFF'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update(w, h) {
      this.y += this.speedY;
      this.oscillation += 0.02;
      this.x += Math.sin(this.oscillation) * 0.8 + this.speedX;
      this.rotation += this.rotSpeed;

      if (this.y > h + 20 || this.x < -30 || this.x > w + 30) {
        this.reset(w, h, false);
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;

      if (this.type === 'petal') {
        // Vẽ cánh hoa mẫu đơn / hoa anh đào
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 0.6, this.size, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Vẽ trái tim nhỏ bay
        ctx.fillStyle = this.color;
        const s = this.size * 0.6;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.3);
        ctx.bezierCurveTo(-s, -s * 0.5, -s * 1.2, s * 0.4, 0, s * 1.2);
        ctx.bezierCurveTo(s * 1.2, s * 0.4, s, -s * 0.5, 0, s * 0.3);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  function initPetalCanvas() {
    if (!canvas || prefersReducedMotion) {
      if (effectsToggle) effectsToggle.style.display = 'none';
      return;
    }

    ctx = canvas.getContext('2d');
    resizeCanvas();

    // Giới hạn 28 hạt để tối ưu hiệu năng mượt mà nhất trên điện thoại
    const count = 28;
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    window.addEventListener('resize', debounce(resizeCanvas, 150));
    animateParticles();
  }

  function resizeCanvas() {
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    if (ctx) ctx.scale(dpr, dpr);
  }

  function animateParticles() {
    if (!isEffectsActive || prefersReducedMotion) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update(w, h);
      particles[i].draw(ctx);
    }

    animationFrameId = requestAnimationFrame(animateParticles);
  }

  function toggleEffects() {
    isEffectsActive = !isEffectsActive;
    if (isEffectsActive) {
      effectsToggle.classList.add('active');
      canvas.style.display = 'block';
      animateParticles();
    } else {
      effectsToggle.classList.remove('active');
      canvas.style.display = 'none';
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }
  }

  if (effectsToggle) {
    effectsToggle.addEventListener('click', toggleEffects);
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Khởi động canvas
  initPetalCanvas();

})();
