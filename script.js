// DharamSeva - JavaScript Functions
// Donation Platform Script

// State Variables
let selectedAmount = 200;
let selectedCause = 'general';
let transactionId = 'DHAR-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 5).toUpperCase();

// Donation Modal Functions
function openDonationModal() {
    const modal = document.getElementById('donationModal');
    const overlay = document.getElementById('modalOverlay');
    if (modal) modal.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDonationModal() {
    const modal = document.getElementById('donationModal');
    const overlay = document.getElementById('modalOverlay');
    if (modal) modal.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Set Selected Cause
function setCause(cause) {
    selectedCause = cause;
    const causes = {
        'general': 'General Donation - Supports Best Performing Causes',
        'education': 'Education for All - Provide Books & Tuition',
        'healthcare': 'Healthcare Access - Free Medical Camps',
        'rural': 'Rural Development - Schools & Clean Water',
        'disaster': 'Disaster Relief - Emergency Aid for Flood Victims'
    };
    const display = document.getElementById('selectedCauseDisplay');
    if (display) {
        display.innerHTML = `
            <span class="text-orange-400 text-sm font-semibold">${cause.toUpperCase()}</span>
            <p class="text-white-medium text-sm mt-1">${causes[cause]}</p>
        `;
    }
}

// Select Amount
function selectAmount(amount) {
    selectedAmount = amount;
    updateTotal();

    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    if (event && event.target) {
        event.target.classList.add('selected');
    }
}

// Update Total
function updateTotal() {
    const totalElement = document.getElementById('totalAmount');
    if (totalElement) {
        totalElement.textContent = '₹' + selectedAmount.toLocaleString('en-IN');
    }
}

// Process Donation
async function processDonation() {
    const nameInput = document.getElementById('donorName');
    const emailInput = document.getElementById('donorEmail');
    const phoneInput = document.getElementById('donorPhone');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';

    if (!name || !email || !phone) {
        showToast('⚠️', 'Please fill in all required fields');
        return;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        showToast('⚠️', 'Please enter a valid email address');
        return;
    }

    const btn = document.getElementById('donateBtn');
    if (btn) {
        btn.innerHTML = '<div class="spinner"></div>';
        btn.disabled = true;
    }

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Show Success
    const receiptAmount = document.getElementById('receiptAmount');
    const receiptDate = document.getElementById('receiptDate');
    const transactionIdElement = document.getElementById('transactionId');

    if (receiptAmount) receiptAmount.textContent = '₹' + selectedAmount.toLocaleString('en-IN');
    if (receiptDate) receiptDate.textContent = new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
    if (transactionIdElement) transactionIdElement.textContent = transactionId;

    // Save to localStorage
    saveDonation(selectedAmount, selectedCause);

    // Close donation modal and show success
    closeDonationModal();
    const successModal = document.getElementById('successModal');
    const overlay = document.getElementById('modalOverlay');
    if (successModal) successModal.classList.add('active');
    if (overlay) overlay.classList.add('active');

    // Reset button
    if (btn) {
        btn.innerHTML = 'Proceed to Pay';
        btn.disabled = false;
    }

    showToast('✅', 'Donation successful! Thank you for your generosity!');
}

// Save Donation to LocalStorage
function saveDonation(amount, cause) {
    const donations = JSON.parse(localStorage.getItem('dharamSevaDonations') || '[]');
    donations.push({
        id: transactionId,
        amount: amount,
        cause: cause,
        date: new Date().toISOString(),
        status: 'Completed'
    });
    localStorage.setItem('dharamSevaDonations', JSON.stringify(donations));
}

// Close Success Modal
function closeSuccessModal() {
    const successModal = document.getElementById('successModal');
    const overlay = document.getElementById('modalOverlay');
    if (successModal) successModal.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';

    // Reset form
    const donorName = document.getElementById('donorName');
    const donorEmail = document.getElementById('donorEmail');
    const donorPhone = document.getElementById('donorPhone');
    if (donorName) donorName.value = '';
    if (donorEmail) donorEmail.value = '';
    if (donorPhone) donorPhone.value = '';
}

// Open History Panel
function openHistory() {
    const historyPanel = document.getElementById('historyPanel');
    const overlay = document.getElementById('modalOverlay');
    if (historyPanel) historyPanel.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Load donations from localStorage
    loadDonationHistory();
}

// Close History Panel
function closeHistory() {
    const historyPanel = document.getElementById('historyPanel');
    const overlay = document.getElementById('modalOverlay');
    if (historyPanel) historyPanel.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Load Donation History
function loadDonationHistory() {
    const donations = JSON.parse(localStorage.getItem('dharamSevaDonations') || '[]');
    const list = document.getElementById('historyList');

    if (!list) return;

    if (donations.length === 0) {
        list.innerHTML = '<p class="text-white-medium text-center">No donations yet. Start making an impact today!</p>';
        return;
    }

    list.innerHTML = donations.map(d => `
        <div class="glass-light rounded-xl p-4">
            <div class="flex justify-between items-start mb-2">
                <div>
                    <p class="text-white-high font-semibold">${d.cause.charAt(0).toUpperCase() + d.cause.slice(1)} for All</p>
                    <p class="text-white-medium text-xs">${new Date(d.date).toLocaleDateString('en-IN')}</p>
                </div>
                <span class="text-green-400 font-semibold">✓ Paid</span>
            </div>
            <div class="flex justify-between items-center pt-3 border-t border-white/10">
                <span class="text-white-medium text-sm">₹${d.amount.toLocaleString('en-IN')}</span>
                <button class="text-orange-400 text-sm hover:underline" onclick="alert('Receipt download coming soon!')">Download Receipt</button>
            </div>
        </div>
    `).join('');
}

// Subscribe Newsletter
function subscribeNewsletter() {
    const emailInput = document.getElementById('newsletterEmail');
    const email = emailInput ? emailInput.value : '';
    
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        showToast('⚠️', 'Please enter a valid email address');
        return;
    }
    showToast('✅', 'Successfully subscribed! Check your inbox.');
    if (emailInput) emailInput.value = '';
}

// Toast Notification
function showToast(icon, message) {
    const toast = document.getElementById('toast');
    const titleElement = document.getElementById('toastTitle');
    const messageElement = document.getElementById('toastMessage');

    if (!toast || !titleElement || !messageElement) return;

    const title = message.split(' ').slice(0, 1).join(' ');
    const msg = message.substring(message.indexOf(' ') + 1);

    titleElement.textContent = title || icon;
    messageElement.textContent = msg || title;

    toast.classList.add('show');
    setTimeout(hideToast, 4000);
}

function hideToast() {
    const toast = document.getElementById('toast');
    if (toast) toast.classList.remove('show');
}

// Download Receipt (Placeholder)
function downloadReceipt() {
    showToast('📥', 'Generating receipt PDF...');
    setTimeout(() => {
        showToast('✅', 'Receipt downloaded successfully!');
    }, 2000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Scroll progress effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const percentage = (scrolled / maxScroll) * 100;

        // Could add scroll-based animations here
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeDonationModal();
            closeSuccessModal();
            closeHistory();
            hideToast();
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Animate elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card-hover').forEach(card => {
        observer.observe(card);
    });
});
