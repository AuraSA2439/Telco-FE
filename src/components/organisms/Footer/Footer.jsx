export default function Footer() {
  return (
    <footer className="w-full h-fit bg-[var(--primary-color)] text-white p-10 mt-10">
      <div className="mx-auto px-6r">
        <p>&copy; {new Date().getFullYear()} Aura SA. All rights reserved.</p>
        <p>Capstone Team A25-CS024</p>
        <p>Asah Batch 1 Tahun 2025</p>
      </div>
    </footer>
  );
}