export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="py-12 mt-6 border border-border">
            <div className="text-center text-sm text-muted">
                &copy; {currentYear} BookIt - All Rights Reserved
            </div>
        </footer>
    );
}
