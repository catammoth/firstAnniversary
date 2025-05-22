document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Smooth scrolling for navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Music toggle functionality
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    
    // Try to autoplay music (may not work due to browser policies)
    function attemptAutoplay() {
        const promise = bgMusic.play();
        if (promise !== undefined) {
            promise.catch(error => {
                // Auto-play was prevented
                musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            });
        }
    }
    
    // Attempt autoplay on user interaction
    document.addEventListener('click', function() {
        attemptAutoplay();
        document.removeEventListener('click', arguments.callee);
    }, { once: true });
    
    // Toggle button functionality
    musicToggle.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play();
            this.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            bgMusic.pause();
            this.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });
    
    // Play/pause buttons functionality
    if (playBtn && pauseBtn) {
        playBtn.addEventListener('click', function() {
            bgMusic.play();
        });
        
        pauseBtn.addEventListener('click', function() {
            bgMusic.pause();
        });
    }
    
    // Update music toggle icon based on playback state
    bgMusic.addEventListener('play', function() {
        musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    });
    
    bgMusic.addEventListener('pause', function() {
        musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    });

    // Enhanced Heart Rain Animation
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        
        // Random size between 10px and 25px
        const size = Math.random() * 20 + 10;
        heart.style.fontSize = `${size}px`;
        
        // Random position across the width of the screen
        heart.style.left = `${Math.random() * 100}vw`;
        
        // Random animation duration between 5s and 15s
        const duration = Math.random() * 10 + 5;
        heart.style.animationDuration = `${duration}s`;
        
        // Random delay up to 5s
        heart.style.animationDelay = `${Math.random() * 5}s`;
        
        // Random color variation
        const hue = 330 + Math.random() * 30; // Pink to red hues
        const saturation = 70 + Math.random() * 30;
        const lightness = 60 + Math.random() * 20;
        heart.style.color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        
        // Random rotation
        const rotation = Math.random() * 360;
        heart.style.transform = `rotate(${rotation}deg)`;
        
        document.getElementById('heart-rain').appendChild(heart);
        
        // Remove heart after animation completes to prevent DOM overload
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }
    
    // Create hearts periodically with varying frequency
    function generateHearts() {
        createHeart();
        const delay = Math.random() * 300 + 100; // Between 100ms and 400ms
        setTimeout(generateHearts, delay);
    }
    
    // Start heart generation
    generateHearts();

    // Photo Album Flip Functionality
    const albumData = [
        {
            image: "1.jpg",
            caption: "Hari Jadian Kita"
        },
        {
            image: "2.jpg",
            caption: "Duduk berdua di Lapangan Banteng"
        },
        {
            image: "3.jpg",
            caption: "CFD pertama kita. Ayuk kapan kita CFD lagi?"
        },
        {
            image: "4.jpg",
            caption: "SENTUL KUY!"
        },
        {
            image: "5.jpg",
            caption: "Kondangan bareng xixi"
        },
        {
            image: "6.jpg",
            caption: "Akhirnya ke Kemang lagi, setelah sekian purnama"
        }
    ];
    
    const book = document.querySelector('.book');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const pageIndicator = document.getElementById('page-indicator');
    
    // Create pages dynamically
    albumData.forEach((item, index) => {
        const page = document.createElement('div');
        page.className = 'page';
        page.id = `page-${index + 1}`;
        page.innerHTML = `
            <div class="page-content">
                <img src="${item.image}" alt="Memory ${index + 1}">
                <p>${item.caption}</p>
            </div>
        `;
        book.appendChild(page);
    });
    
    const pages = document.querySelectorAll('.page');
    let currentPage = 0;
    const totalPages = pages.length;
    
    function updatePage() {
        // Hide all pages
        pages.forEach((page, index) => {
            page.style.display = 'none';
            page.style.transform = 'rotateY(0deg)';
            page.style.zIndex = totalPages - index;
        });
        
        // Show current page
        pages[currentPage].style.display = 'flex';
        pageIndicator.textContent = `${currentPage + 1}/${totalPages}`;
        
        // Disable buttons when at ends
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === totalPages - 1;
    }
    
    function nextPage() {
        if (currentPage < totalPages - 1) {
            // Animate current page out
            pages[currentPage].style.transform = 'rotateY(-180deg)';
            
            setTimeout(() => {
                currentPage++;
                updatePage();
            }, 500);
        }
    }
    
    function prevPage() {
        if (currentPage > 0) {
            // Animate current page out
            pages[currentPage].style.transform = 'rotateY(180deg)';
            
            setTimeout(() => {
                currentPage--;
                updatePage();
            }, 500);
        }
    }
    
    nextBtn.addEventListener('click', nextPage);
    prevBtn.addEventListener('click', prevPage);
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextPage();
        } else if (e.key === 'ArrowLeft') {
            prevPage();
        }
    });
    
    // Initialize album
    updatePage();

    // Typing Effect for Love Letter
    const letterText = `Hari ini, di hari ulang tahun pertama kita, aku duduk dengan hati yang begitu penuh rasa syukur, penuh cinta, dan penuh kenangan indah bersamamu. Selama 365 hari terakhir, hidupku terasa seperti mimpi yang tak ingin kubangunkan. Bersamamu, setiap detik terasa istimewa.

Kau tahu, aku masih ingat jelas momen-momen kecil yang justru paling berarti. Saat pertama kali melihatmu di Gereja Jelambar, hatiku langsung berdegup kencang. Pikiranku dipenuhi pertanyaan: "Dia imut banget, umurnya berapa ya? Namanya siapa? Bisa nggak ya aku kenalan?" Dan lihatlah sekarang, takdir membawa kita sampai di sini.

Taman Literasi Blok M menjadi saksi pertama kisah kita. Aku masih tersenyum sendiri mengingat teleponmu saat kau kebingungan cari pintu masuk. Suaramu yang lucu dan grogi itu bikin aku makin penasaran. Pulangnya, kita duduk berdua di MRT. Aku diam-diam senang bisa memperpanjang waktu bersamamu, meski hanya dalam perjalanan.

Lalu, tanggal 23 Mei 2024 di Summarecon Mall Bekasi, momen yang takkan pernah kulupa. Saat aku memberanikan diri bertanya, "Kamu mau jadi pacarku?" dan kau menjawab "Iya", dunia seakan berhenti. Aku merasa seperti pria paling beruntung di bumi. Kata sederhana itu mengubah segalanya.

Aku selalu kagum padamu, pada cara kau mencintai tanpa syarat, pada ketegaranmu menghadapi hari-hari sulit, dan pada caramu menemukan kebahagiaan dalam hal-hal kecil. Kau mengajariku arti kesabaran, pengertian, dan arti home yang sesungguhnya: home adalah tempat di mana kamu ada.

Maafkan aku jika kadang keras kepala atau sulit dimengerti. Tapi terima kasih, karena kau tetap bertahan, mencintaiku apa adanya. Aku berjanji akan terus berusaha menjadi lebih baik, untuk masa depan kita.

Ini baru tahun pertama, tapi aku sudah tak sabar menulis bab-bab selanjutnya bersamamu. Bersamamu, aku percaya the best is yet to come.

Selamat hari jadi, sayang. Aku mencintaimu, hari ini dan nanti.`;
    
    const typedTextElement = document.getElementById('typed-text');
    const cursorElement = document.getElementById('cursor');
    
    function typeWriter(text, i, cb) {
        if (i < text.length) {
            // Add the next character
            typedTextElement.innerHTML = text.substring(0, i + 1);
            
            // Randomize typing speed for more natural effect
            const speed = 10 + Math.random() * 30;
            
            // Occasionally pause at punctuation
            const nextChar = text.charAt(i);
            let delay = speed;
            if (['.', '!', '?', '\n'].includes(nextChar)) {
                delay += 200;
            } else if (nextChar === ',') {
                delay += 100;
            }
            
            setTimeout(() => typeWriter(text, i + 1, cb), delay);
        } else if (typeof cb === 'function') {
            setTimeout(cb, 1000);
        }
    }
    
    // Start typing when letter section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && typedTextElement.textContent === '') {
                cursorElement.style.display = 'inline-block';
                typeWriter(letterText, 0, () => {
                    cursorElement.style.animation = 'none';
                    setTimeout(() => {
                        cursorElement.style.display = 'none';
                    }, 500);
                });
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(document.querySelector('.letter-section'));
});