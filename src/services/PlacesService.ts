import axios from 'axios';

const API_URL = "https://place-autocomplete1.p.rapidapi.com/autocomplete/json"

export interface Suggestion {
    id: number;
    city: string;
    country: string;
}

interface BaseResponse {
    predictions: { terms: { value: string }[] }[];
}

export class PlacesService {
    static async getCitiesSuggestions(name: string): Promise<Suggestion[]> {
        const options = {
            method: 'GET',
            url: API_URL,
            params: {
                input: name,
                radius: '500'
            },
            headers: {
                'x-rapidapi-key': 'bc06615573mshbeba0075e8392acp1f94e9jsn5b16c88a0191',
                'x-rapidapi-host': 'place-autocomplete1.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request<BaseResponse>(options);
            return response.data.predictions.map(({ terms }, i) => ({
                id: i,
                city: terms[0].value,
                country: terms[terms.length - 1].value
            }));
        } catch (error) {
            console.error('Error fetching places:', error);
            throw new Error('Failed to retrieve places');
        }
    }
}