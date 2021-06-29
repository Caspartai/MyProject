import React , {useState} from 'react';
import AddLinkForm from "../components/AddLinkForm";
import FilterInput from "../components/ FilterInput";
// import LinkRow from "../components/LinkRow";
import LinkTable from "../components/LinkTable";

export default function Sharelink() {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [tags, setTags] = useState("");  
    const [filter, setFilter] = useState("")
    // tags is supposed to be an array
    const [links, setLinks] = useState([
        {name:"Friday", url:"www.youtube.com", tags:["fun","friday"]},
        {name:"Twitter", url:"www.twitter.com", tags:["social","media","tweet,","trump"]},
    ])
    function onSubmit(event) {
        event.preventDefault();
        let newTags = tags.split(",");
        for (let i = 0; i < newTags.length; i++) {
            newTags[i] = newTags[i].trim();
        }
        const newLink = {
            name: title,
            url: url,
            tags:  newTags
        }
        console.log("It is able to submit new link", newLink)
        let newLinks = links.concat(newLink);
        console.log(newLinks);
        setLinks(newLinks);
    }


    function titleOnChange(event) {
        let newTitle = event.target.value;
        setTitle(newTitle);
    }
    function urlOnChange(event) {
        let newURL = event.target.value;
        setUrl(newURL);
    }
    function tagsOnChange(event) {
        let newTags = event.target.value;
        setTags(newTags);
    }
    function filterLinks(filter) {
        let filterInput = filter.toLowerCase(); 
        // let filterInput = "fr"; 
        return links.filter((link) => {
            return link.url.toLowerCase().indexOf(filterInput) > -1 || link.tags.map((tag) => {
                console.log(tag.toLowerCase().indexOf(filterInput))
                return ( tag.toLowerCase().indexOf(filterInput)) > -1;
            })
            .indexOf(true) > -1
        })
    }

    function filterLinksButton(links) {
        let newLinks = filterLinks(links);
    }

    function filterOnChange(event) {
        let newFilter = event.target.value;
        setFilter(newFilter);
    }

    return (
        <div>
            <h1>Sharelink</h1>
            <center>
            <AddLinkForm onSubmit={onSubmit} titleOnChange={titleOnChange} title={title} urlOnChange={urlOnChange} url={url} tagsOnChange={tagsOnChange} tags={tags}/> 
            <FilterInput filter={filter} filterOnChange={filterOnChange}/>
            {/* If you want to pass a array of string or objects ,The tag below will throw an error */}
            {/* Make sure I am careful */}
            {/* <LinkRow /> */}
            <LinkTable links={filterLinks(filter)}/>
            <button onClick={filterLinksButton} newLinks={filterLinksButton}>Filter</button>
            </center>
        </div>
    );
}