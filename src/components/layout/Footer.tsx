export function Footer() {
  return (
    <footer
      className="text-center py-4 mt-5"
      style={{ backgroundColor: '#f8f9fa', borderTop: '1px solid #eaeaea' }}
    >
      <p className="text-muted mb-0">
        © {new Date().getFullYear()} My Blog Platform | Built with ❤️ using web development
      </p>
    </footer>
  );
}
