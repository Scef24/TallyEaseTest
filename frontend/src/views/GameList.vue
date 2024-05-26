    <template>
        <div>
        <h1>Game List</h1>
        <div v-if="loading">
        Loading...
        </div>
        <table>
            <thead>
                <tr>
                    <th>Game Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody>
                <tr  v-for="game in games" :key="game.id">
                <td>{{ game.name}}</td>
                <td>{{ game.description }}</td>
                <td>{{ game.category }}</td>
                <td>{{ game.type }}</td>
                </tr>
            </tbody>
        </table>
        </div>
    </template>
    
    <script>
    import axios from 'axios';
    
    export default {
        name: 'GameList',
        data() {
        return {
            games: [],
            loading:true
        };
        },
        mounted() {
        const token = localStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/api/games', {
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
            }
        })
            .then(response => {
            this.games = response.data;
            this.loading = false
            console.log(response.data.name)
            })
            .catch(error => {
            console.error('Error fetching game list: ', error);
            this.loading = false
            });
        }
    };
    </script>
<style>
 table{
    color:wheat;
 }
</style>    