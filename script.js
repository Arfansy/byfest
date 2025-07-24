document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Dynamic Scroll Animations (Reveal Sections) ---
    const sections = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.2 // 20% of the section must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // observer.unobserve(entry.target); // Hapus ini jika ingin bisa re-animate
            } else {
                // entry.target.classList.remove('is-visible'); // Opsional: sembunyikan lagi saat keluar view
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- 2. Basic "Add to Wishlist" Functionality ---
    const heartIcons = document.querySelectorAll('.product-card .heart-icon');

    heartIcons.forEach(icon => {
        icon.addEventListener('click', (event) => {
            event.stopPropagation();
            event.preventDefault();

            icon.classList.toggle('active');

            const productName = icon.closest('.product-card').querySelector('h3').textContent;
            if (icon.classList.contains('active')) {
                console.log(`'${productName}' added to wishlist!`);
                alert(`${productName} ditambahkan ke wishlist!`);
            } else {
                console.log(`'${productName}' removed from wishlist!`);
                alert(`${productName} dihapus dari wishlist.`);
            }
        });
    });

    // --- 3. Header Scroll Shrink ---
    const header = document.querySelector('.header');
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 4. Product Filtering and Search (for all_product.html) ---
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const productGrid = document.getElementById('productGrid');

    // Pastikan elemen filter dan grid ada di halaman saat ini
    if (searchInput && categoryFilter && productGrid) {
        const products = productGrid.querySelectorAll('.product-card');

        function filterProducts() {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedCategory = categoryFilter.value;

            products.forEach(product => {
                const productName = product.querySelector('h3').textContent.toLowerCase();
                const productCategory = product.dataset.category; // Mengambil dari data-category

                const matchesSearch = productName.includes(searchTerm);
                const matchesCategory = selectedCategory === 'all' || productCategory === selectedCategory;

                if (matchesSearch && matchesCategory) {
                    product.style.display = 'block'; // Tampilkan produk
                } else {
                    product.style.display = 'none'; // Sembunyikan produk
                }
            });
        }

        searchInput.addEventListener('keyup', filterProducts);
        categoryFilter.addEventListener('change', filterProducts);

        // Panggil filterProducts saat halaman dimuat untuk memastikan status awal
        filterProducts();
    }
});