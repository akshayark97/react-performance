import { useMemo, useState, useTransition } from 'react';

import { Container } from '$components/container';
import { Input } from '$components/input';
import { Pokemon } from './components/pokemon';
import { filterPokemon } from './utilities/filter-pokemon';

const Application = () => {
  const [inputQuery, setInputQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const filteredPokemon = useMemo(() => filterPokemon(inputQuery), [inputQuery]);

  const [isPending, startTransition] = useTransition()


  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputQuery(e.target.value);

    startTransition(() => {
      setInputQuery(e.target.value);
    });
  };

  return (
    <Container className="space-y-8">
      <section id="filters">
        <Input
          label="Search Pokemon"
          placeholder="Search by name, type, ability, species, or description…"
          value={inputQuery}
          onChange={handleChangeInput}
        />
      </section>
      <section className={`grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 ${isPending ? 'animate-pulse' : 'opacity-100'}`}>
        {filteredPokemon.map((pokemon) => (
          <Pokemon key={pokemon.id} {...pokemon} />
        ))}
      </section>
    </Container>
  );
};

export default Application;
