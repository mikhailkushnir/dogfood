import './index.css'

export const Search = ({ setSearch }) => {

    return (
        <input
            placeholder="поиск.."
            onChange={(e) => setSearch(e.target.value)}
            className="search__input"
        />
    )
}