$(document).ready(function() {
    if ($('#sidebar').hasClass('collapsed')) {
        $('#content').addClass('expanded');
    }

    $('#sidebarToggle').on('click', function() {
        $('#sidebar').toggleClass('collapsed');
        $('#content').toggleClass('expanded');
        console.log('Sidebar toggled');
    });
});
