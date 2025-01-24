const About = () => {
  return (
    <div className="about-container max-w-3xl mx-auto text-center p-6 flex justify-center flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-[#CC4C41]">
        À propos de ce site
      </h1>
      <p className="text-lg mb-4">
        Ce site a été créé dans le cadre de mon portfolio pour mettre en avant
        mes compétences en développement web. Il utilise React pour construire
        une interface interactive et réactive, permettant la recherche en temps
        réel et une navigation fluide.
      </p>
      <p className="text-lg">
        L'objectif de ce projet est de démontrer ma capacité à développer des
        applications modernes, fonctionnelles et élégantes, tout en utilisant
        des outils comme TypeScript, Tailwind CSS et des API REST pour intégrer
        des données dynamiques.
      </p>
    </div>
  );
};

export default About;
