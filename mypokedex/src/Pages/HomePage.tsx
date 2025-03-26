import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Section principale (Hero) */}
      <main className="flex-grow bg-gradient-to-r from-[#FFEE99] via-white to-[#FFEE99] flex flex-col items-center justify-center py-16">
        <div className="max-w-2xl text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#CC4C41] mb-6">
            Bienvenue sur <span className="italic">Mon Pokédex</span> !
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
            Explorez le monde fantastique des Pokémon, découvrez leurs
            caractéristiques et trouvez ceux qui correspondent le mieux à vos
            envies.
          </p>
          <Link to="/pokemon">
            <button
              className="px-6 py-3 bg-[#C62828] text-[#FFEE99] rounded-md text-lg font-semibold shadow-md
                         hover:bg-[#b43d33] hover:shadow-lg active:bg-[#9e342b]
                         transition-all duration-200 ease-in-out"
            >
              Découvrir les Pokémon
            </button>
          </Link>
        </div>
      </main>

      {/* Section "fonctionnalités rapides" ou autres infos */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-[#CC4C41] mb-6">
            Ce que vous pouvez faire
          </h3>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-start md:items-stretch">
            {/* Feature #1 */}
            <div className="bg-[#FFEE99] rounded-lg p-6 flex-1 shadow-md hover:shadow-lg transition">
              <h4 className="text-xl font-bold text-[#C62828] mb-2">
                Rechercher un Pokémon
              </h4>
              <p className="text-gray-700">
                Utilisez notre barre de recherche pour filtrer les Pokémon et
                trouver rapidement ceux qui vous intéressent.
              </p>
            </div>
            {/* Feature #2 */}
            <div className="bg-[#FFEE99] rounded-lg p-6 flex-1 shadow-md hover:shadow-lg transition">
              <h4 className="text-xl font-bold text-[#C62828] mb-2">
                Voir leurs stats
              </h4>
              <p className="text-gray-700">
                Consultez les statistiques détaillées de chaque Pokémon pour en
                apprendre plus sur leurs forces et faiblesses.
              </p>
            </div>
            {/* Feature #3 */}
            <div className="bg-[#FFEE99] rounded-lg p-6 flex-1 shadow-md hover:shadow-lg transition">
              <h4 className="text-xl font-bold text-[#C62828] mb-2">
                Découvrir les types
              </h4>
              <p className="text-gray-700">
                Découvrez la palette de types Pokémon et comprenez comment ils
                interagissent les uns avec les autres.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
