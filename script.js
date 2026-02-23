document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enter-btn');
    const overlay = document.getElementById('entrance-overlay');
    const mainContent = document.getElementById('main-content');
    const curtains = document.querySelectorAll('.curtain');
    const entranceContent = document.querySelector('.entrance-content');

    // 0. Personalization Logic
    const greetingDatabase = {
        "vân": {
            hero: "Chúc Vân một năm mới an khang",
            garden: "Chúc Vân béo lên 10kg, thôi 20kg luôn. Vân nói anh nghe hông hiểu nhưng mà +1 điểm cho sự cố gắng!"
        },
        "thanh": {
            hero: "Năm mới vui vẻ nha Thanh",
            garden: "Chúc Thanh năm mới ngày càng đẹp gái. Xứng đáng có nhiều bạn trai!"
        },
        "quý": {
            hero: "Năm mới vui vẻ nha anh Quý",
            garden: "Chúc anh Quý năm mới ngày càng đẹp trai. Xứng đáng có 10 ng yêu!"
        },
        "khang": {
            hero: "Năm mới vui vẻ nha Ní",
            garden: "Chúc Ní năm mới hát ngày càng hay. Xứng đáng có 10 ng yêu"
        },
        "yến": {
            hero: "Năm mới rạng rỡ nha Yến",
            garden: "Chúc Yến năm mới vạn sự như ý, bớt 'ét ô ét' và tiền vào như nước, tiền ra như giọt sương mai!"
        },
        "giang": {
            hero: "Năm mới thành công nha Giang",
            garden: "Chúc Giang năm mới bứt phá thần tốc, người yêu không có nhưng chó phải có một con thật xịn nhé!"
        },
        "vy": {
            hero: "Năm mới thăng tiến nha Vy",
            garden: "Chúc Vy năm mới thăng tiến vèo vèo, nhan sắc thăng hạng mà cân nặng thì 'đứng yên chịu trận' nha!"
        },
        "default": {
            hero: "Bính Ngọ 2026 - Biểu tượng của sức mạnh, nhiệt huyết và sự bứt phá thần tốc.",
            garden: "Một năm mới rực rỡ, bình an và thành công đang chờ đợi phía trước!"
        }
    };

    function initPersonalization() {
        const urlParams = new URLSearchParams(window.location.search);
        const toParam = urlParams.get('to');
        
        if (toParam) {
            const nameKey = toParam.trim().toLowerCase();
            const displayName = toParam.trim().charAt(0).toUpperCase() + toParam.trim().slice(1);
            
            // Update Entrance
            const entranceWelcome = document.getElementById('entrance-welcome');
            if (entranceWelcome) {
                entranceWelcome.innerText = `Chào ${displayName}, đón năm Bính Ngọ 2026 rực rỡ`;
            }
            
            // Update Main Title
            const receiverNameEl = document.getElementById('receiver-name');
            if (receiverNameEl) {
                receiverNameEl.innerText = `Chúc ${displayName} `;
            }

            // Update Garden Name
            const gardenNameEl = document.getElementById('garden-name');
            if (gardenNameEl) {
                gardenNameEl.innerText = displayName;
            }
            
            // Update Custom Message
            const customMessageEl = document.getElementById('custom-message');
            if (customMessageEl) {
                // Try to find exact match or try to find an include match if exact fails
                let greetingObj = greetingDatabase['default'];
                if (greetingDatabase[nameKey]) {
                    greetingObj = greetingDatabase[nameKey];
                } else {
                     // Find first key that is part of the name
                     const matchedKey = Object.keys(greetingDatabase).find(key => key !== 'default' && nameKey.includes(key));
                     if(matchedKey) greetingObj = greetingDatabase[matchedKey];
                }
                customMessageEl.innerText = greetingObj.hero;
            }
        }
    }
    
    initPersonalization();

    // 1. Entrance Logic
    const navControls = document.querySelector('.nav-controls');
    const sections = document.querySelectorAll('section');
    const nextBtn = document.getElementById('next-btn');
    const dots = document.querySelectorAll('.nav-dot');
    let currentSectionIndex = 0;

    function showSection(index) {
        sections[index].scrollIntoView({ behavior: 'smooth' });
    }

    // Update active dot on scroll
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(sections).indexOf(entry.target);
                currentSectionIndex = index;
                
                // Toggle active class for animation
                sections.forEach((s, i) => {
                    s.classList.toggle('active', i === index);
                    dots[i].classList.toggle('active', i === index);
                });
                
                // Show/hide next button
                if (nextBtn) {
                    nextBtn.style.opacity = index === sections.length - 1 ? '0' : '1';
                    nextBtn.style.pointerEvents = index === sections.length - 1 ? 'none' : 'all';
                }
            }
        });
    }, { threshold: 0.6 });

    sections.forEach(section => scrollObserver.observe(section));

    enterBtn.addEventListener('click', () => {
        overlay.classList.add('opened');
        
        setTimeout(() => {
            overlay.style.pointerEvents = 'none';
            mainContent.classList.remove('hidden');
            
            setTimeout(() => {
                mainContent.classList.add('visible');
                overlay.style.opacity = '0';
                navControls.classList.add('visible');
                
                setTimeout(() => {
                    overlay.classList.add('hidden');
                    initFireworks();
                }, 1000);
            }, 100);
        }, 1500);
    });

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentSectionIndex < sections.length - 1) {
                showSection(currentSectionIndex + 1);
            }
        });
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => showSection(i));
    });

    // 2. Fortune Game Logic
    const shakeBtn = document.getElementById('shake-btn');
    const diceCup = document.getElementById('dice-cup');
    const fortuneResult = document.getElementById('fortune-result');
    const fortuneText = document.getElementById('fortune-text');
    const fortuneAdvice = document.querySelector('.fortune-advice');
    const closeBtn = document.querySelector('.close-btn');

    const fortunes = [
        { title: "Quẻ Đại Cát", advice: "Năm nay mọi sự hanh thông, tài lộc dồi dào, ngựa lửa dẫn lối đến thành công rực rỡ." },
        { title: "Quẻ Thượng Cát", advice: "Tình duyên chớm nở, gia đạo an vui. Hãy mạnh dạn thực hiện những dự định đang ấp ủ." },
        { title: "Quẻ Trung Cát", advice: "Vạn sự bình hòa, cần kiên trì bền bỉ như sức bền của thiên lý mã, cuối năm sẽ gặt hái quả ngọt." },
        { title: "Quẻ Tiến Bảo", advice: "Tiền tài gõ cửa, kinh doanh thuận lợi. Đừng quên chia sẻ may mắn với mọi người chung quanh." },
        { title: "Quẻ Hỷ Sự", advice: "Tin vui từ phương xa, một năm đầy ắp những buổi tiệc mừng và sự kiện trọng đại." },
        { title: "Quẻ Lộc Mã", advice: "Cơ hội thăng tiến bất ngờ. Hãy chuẩn bị tinh thần để 'phi nước đại' đến những tầm cao mới." },
        { title: "Quẻ Diên Niên", advice: "Sức khỏe dồi dào, tâm hồn an tĩnh. Một năm tuyệt vời để chăm sóc bản thân và gia đình." }
    ];

    shakeBtn.addEventListener('click', () => {
        diceCup.classList.add('shaking');
        shakeBtn.disabled = true;
        shakeBtn.innerText = "Đang gieo...";

        // Simulate sound with haptic-like vibration class
        document.body.classList.add('vibrating');

        setTimeout(() => {
            diceCup.classList.remove('shaking');
            document.body.classList.remove('vibrating');
            
            const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
            const luckyNumber = Math.floor(Math.random() * 99) + 1;
            
            fortuneText.innerHTML = `<span class="res-title">${randomFortune.title}</span><br><small>Số may mắn: ${luckyNumber}</small>`;
            fortuneAdvice.innerText = randomFortune.advice;
            fortuneResult.classList.remove('hidden');
            shakeBtn.disabled = false;
            shakeBtn.innerText = "Gieo Quẻ";
        }, 1500);
    });

    closeBtn.addEventListener('click', () => {
        fortuneResult.classList.add('hidden');
    });

    // 3. Sound & Share Logic
    const soundToggle = document.getElementById('sound-toggle');
    let soundOn = false;
    soundToggle.addEventListener('click', () => {
        soundOn = !soundOn;
        soundToggle.innerText = soundOn ? "🔇 Tắt Nhạc Xuân" : "🔊 Bật Nhạc Xuân";
        // Here you would normally play/pause an Audio object
        if(soundOn) {
            console.log("Playing Spring Music...");
        }
    });

    const shareBtn = document.querySelector('.share-btn');
    shareBtn.addEventListener('click', () => {
        alert("Cảm ơn bạn đã chia sẻ niềm vui năm mới Bính Ngọ 2026!");
    });

    // 4. Decorative Effects
    function initDecorativeEffects() {
        const blossomContainer = document.getElementById('blossom-container');
        if (!blossomContainer) return;

        // Falling Blossoms (Mai/Đào)
        setInterval(() => {
            const blossom = document.createElement('div');
            blossom.className = 'blossom';
            blossom.style.left = Math.random() * 100 + 'vw';
            blossom.style.animationDuration = (Math.random() * 3 + 4) + 's';
            blossom.style.opacity = Math.random();
            blossom.innerHTML = Math.random() > 0.5 ? '🌸' : '🌼';
            blossomContainer.appendChild(blossom);
            
            setTimeout(() => blossom.remove(), 7000);
        }, 500);

        // Scroll Reveal
        const reveals = document.querySelectorAll('.scroll-reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        reveals.forEach(el => observer.observe(el));
    }

    // 5. Mini Fireworks / Particles logic
    function initFireworks() {
        const canvas = document.getElementById('fireworks-canvas');
        if (!canvas) return;

        initDecorativeEffects();

        setInterval(() => {
            createParticle(canvas, Math.random() * 100, Math.random() * 100);
        }, 200);

        // Add explosion on click
        document.addEventListener('click', (e) => {
            if (mainContent.classList.contains('hidden')) return;
            for(let i=0; i<15; i++) {
                createParticle(canvas, (e.clientX / window.innerWidth) * 100, (e.clientY / window.innerHeight) * 100);
            }
        });
    }

    function createParticle(container, x, y) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 6 + 2;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.left = x + '%';
        p.style.top = y + '%';
        p.style.background = `hsl(${Math.random() * 60 + 10}, 100%, 60%)`; // Red/Gold/Orange
        
        container.appendChild(p);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 150 + 50;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;

        const anim = p.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${dx}px, ${dy}px) scale(0)`, opacity: 0 }
        ], {
            duration: Math.random() * 1000 + 800,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        });

        anim.onfinish = () => p.remove();
    }

    // 6. Personalized Spring Garden Logic
    const sunOrb = document.getElementById('sun-orb');
    const branchContainer = document.getElementById('branch-container');
    const blossomsTarget = document.getElementById('blossoms-target');
    const gardenRevealMessage = document.getElementById('garden-reveal-message');
    const gardenMsgText = document.getElementById('garden-msg-text');
    let isDraggingSun = false;
    let bloomCount = 0;
    const maxBlooms = 40; // Increased max blooms for a better effect
    let isRevealing = false;

    if (sunOrb && branchContainer) {
        let offsetX, offsetY;

        const startDrag = (e) => {
            if (isRevealing) return;
            isDraggingSun = true;
            sunOrb.style.transition = 'none';
            // Get client coordinates whether touch or mouse
            const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
            
            const rect = sunOrb.getBoundingClientRect();
            offsetX = clientX - rect.left;
            offsetY = clientY - rect.top;
        };

        const onDrag = (e) => {
            if (!isDraggingSun || isRevealing) return;
            e.preventDefault(); // Prevent scrolling while dragging

            const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

            const containerRect = branchContainer.getBoundingClientRect();
            
            // Calculate relative position within container
            let x = clientX - containerRect.left - offsetX;
            let y = clientY - containerRect.top - offsetY;

            // Boundaries
            x = Math.max(0, Math.min(x, containerRect.width - sunOrb.offsetWidth));
            y = Math.max(0, Math.min(y, containerRect.height - sunOrb.offsetHeight));

            sunOrb.style.left = `${x}px`;
            sunOrb.style.top = `${y}px`;

            // Spawn blossoms logic
            if (bloomCount < maxBlooms && Math.random() > 0.4) {
                spawnBlossom(x + sunOrb.offsetWidth/2, y + sunOrb.offsetHeight/2);
            }

            // Check if we reached the max blooms while dragging
            if (bloomCount >= maxBlooms) {
                triggerMorphReveal();
            }
        };

        const endDrag = () => {
            if(!isDraggingSun) return;
            isDraggingSun = false;
            sunOrb.style.transition = 'transform 0.1s';
            if (bloomCount >= maxBlooms) {
                triggerMorphReveal();
            }
        };

        function triggerMorphReveal() {
            if (isRevealing) return;
            isRevealing = true;
            isDraggingSun = false;

            // Reveal message text setup
            const nameKey = new URLSearchParams(window.location.search).get('to')?.trim().toLowerCase() || 'default';
            let greetingObj = greetingDatabase['default'];
            if (greetingDatabase[nameKey]) {
                greetingObj = greetingDatabase[nameKey];
            } else {
                 const matchedKey = Object.keys(greetingDatabase).find(key => key !== 'default' && nameKey.includes(key));
                 if(matchedKey) greetingObj = greetingDatabase[matchedKey];
            }
            gardenMsgText.innerText = greetingObj.garden;

            // Hide the sun orb smoothly
            sunOrb.style.transition = 'all 0.5s ease';
            sunOrb.style.transform = 'scale(0)';
            sunOrb.style.opacity = '0';

            // Animate blossoms flowing to the center
            const blossoms = document.querySelectorAll('.blossom-spawn');
            const containerRect = branchContainer.getBoundingClientRect();
            const centerX = containerRect.width / 2;
            const centerY = containerRect.height / 2;

            blossoms.forEach((b) => {
                const currentLeft = parseFloat(b.style.left);
                const currentTop = parseFloat(b.style.top);
                
                b.animate([
                    { left: `${currentLeft}px`, top: `${currentTop}px`, transform: 'translate(-50%, -50%) scale(1) rotate(0deg)', opacity: 1 },
                    { left: `${centerX}px`, top: `${centerY}px`, transform: 'translate(-50%, -50%) scale(0) rotate(360deg)', opacity: 0 }
                ], {
                    duration: 1000 + Math.random() * 800, // staggered flow effect
                    easing: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
                    fill: 'forwards'
                });
            });

            // After blossoms gather, burst into the text message
            setTimeout(() => {
                gardenRevealMessage.classList.remove('hidden');
                gardenRevealMessage.classList.add('morph-in');
                
                // Cleanup old petals
                setTimeout(() => {
                    blossomsTarget.innerHTML = '';
                    sunOrb.style.display = 'none';
                }, 1000);
            }, 1200);
        }

        sunOrb.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', endDrag);

        sunOrb.addEventListener('touchstart', startDrag, {passive: false});
        document.addEventListener('touchmove', onDrag, {passive: false});
        document.addEventListener('touchend', endDrag);

        function spawnBlossom(x, y) {
            bloomCount++;
            const blossom = document.createElement('div');
            blossom.className = 'blossom-spawn';
            blossom.style.left = `${x + (Math.random() * 40 - 20)}px`;
            blossom.style.top = `${y + (Math.random() * 40 - 20)}px`;
            blossom.innerText = Math.random() > 0.5 ? '🌸' : '🌼';
            blossomsTarget.appendChild(blossom);
        }
    }
});
