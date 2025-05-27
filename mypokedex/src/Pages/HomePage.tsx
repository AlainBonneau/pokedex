import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
  {
    title: "Rechercher un Pokémon",
    description:
      "Utilisez notre barre de recherche pour filtrer les Pokémon et trouver rapidement ceux qui vous intéressent.",
  },
  {
    title: "Voir leurs stats",
    description:
      "Consultez les statistiques détaillées de chaque Pokémon pour en apprendre plus sur leurs forces et faiblesses.",
  },
  {
    title: "Découvrir les types",
    description:
      "Découvrez la palette de types Pokémon et comprenez comment ils interagissent les uns avec les autres.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section */}
      <main className="flex-grow bg-gradient-to-r from-[#FFEE99] via-white to-[#FFEE99] flex flex-col items-center justify-center py-16">
        <motion.div
          className="max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#CC4C41] mb-6">
            Bienvenue sur <span className="italic">Mon Pokédex</span> !
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
            Explorez le monde fantastique des Pokémon, découvrez leurs
            caractéristiques et trouvez ceux qui correspondent le mieux à vos
            envies.
          </p>
          <Link to="/pokemon">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => new Audio("/sounds/blip.mp3").play()}
              className="px-6 py-3 bg-[#C62828] text-[#FFEE99] rounded-md text-lg font-semibold shadow-md hover:bg-[#b43d33] hover:shadow-lg active:bg-[#9e342b] transition-all duration-200 ease-in-out"
            >
              Découvrir les Pokémon
            </motion.button>
          </Link>
        </motion.div>
      </main>

      {/* Fonctionnalités */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-[#CC4C41] mb-10">
            Ce que vous pouvez faire
          </h3>
          <motion.div
            className="flex flex-col md:flex-row gap-6 justify-center items-start md:items-stretch"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-[#FFEE99] rounded-lg p-6 flex-1 shadow-md hover:shadow-lg transition"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                <h4 className="text-xl font-bold text-[#C62828] mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-700">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
