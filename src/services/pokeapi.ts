export async function obtener_pokemon() {
	try {
		const arrayS=[];
		const num = 20;


		for (let index = 1; index <= num; index++) {
            const random = Math.floor(Math.random() * 1009 + 1);
			const data = await fetch('https://pokeapi.co/api/v2/pokemon/' + random);
			const pok= await data.json();
			console.log(pok);
			arrayS.push(pok);
		};

		return arrayS;

	} catch (error) {
		console.log(error);
	}
}