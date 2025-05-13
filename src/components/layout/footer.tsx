export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-6 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Python Sprouts. Grow your coding skills!
        </p>
      </div>
    </footer>
  );
}
