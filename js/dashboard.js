/*!
 * Dashboard specific JavaScript
 * Handles table interactions like 'select all'.
 */

document.addEventListener('DOMContentLoaded', () => {
    const selectAllCheckbox = document.querySelector('.product-table thead th input[type="checkbox"]');
    const rowCheckboxes = document.querySelectorAll('.product-table tbody td input[type="checkbox"]');

    if (selectAllCheckbox && rowCheckboxes.length) {
        selectAllCheckbox.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            rowCheckboxes.forEach(checkbox => {
                checkbox.checked = isChecked;
            });
        });
    }
});
