import { useEffect, useState } from "react"
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from "react-accessible-accordion";
import SearhForm from "./SearchForm";
import Moment from "moment";

export default function News() {
    const [articles, setArticles] = useState([]);
    const [term, setTerm] = useState('weather');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&api-key=6bmiBTD7MaAeP7lcZ1BEGbwbmy7CNYuT`)
                const articles = await res.json()
                console.log(articles.response.docs)
                setArticles(articles.response.docs)
                setIsLoading(false)
            } catch (error) {
                console.error(error);
            }
        }
        fetchArticles()
    }, [term])

    return (
        <>
            <div>
                <div className="card bg-light">
                    <div className="card-header text-center align-middle p-2 mb-2 bg-secondary text-white">
                        <h6 className="mb-2 fw-bold text-capitalize">Viewing articles about {term}</h6>
                        <SearhForm searchText={(text) => setTerm(text)} />
                    </div>
                    {isLoading ? <h1 className="text-center my-4">Loading...</h1> :
                        <section className="px-2 py-2">
                            {articles.map((article) => {
                                const { abstract, headline: { main }, byline: { original }, lead_paragraph, news_desk, section_name, web_url, _id, word_count, pub_date } = article

                                return (
                                    <article key={_id}>
                                        <Accordion allowZeroExpanded>
                                            <AccordionItem key={_id}>
                                                <AccordionItemHeading>
                                                    <AccordionItemButton>
                                                        <h4 className="fw-bold">{main}</h4>
                                                        <h6>{abstract}</h6>
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <p style={{ fontSize: "15px" }}>{lead_paragraph}</p>
                                                    <a href={web_url} target="_blank" style={{ fontSize: "15px" }}>Read More</a>
                                                    <ul className="list-group list-group-flush" style={{ fontSize: "15px" }}>
                                                        <li className="list-group-item">{original}</li>
                                                        <li className="list-group-item">{Moment(pub_date).format('dddd, MMMM Do YYYY')}</li>
                                                        <li className="list-group-item">{news_desk} {"-"} {section_name}</li>
                                                        <li className="list-group-item">{word_count} words</li>
                                                    </ul>
                                                </AccordionItemPanel>
                                            </AccordionItem>
                                        </Accordion>
                                        <hr />
                                    </article>
                                )
                            })}
                        </section>
                    }
                </div>
            </div>
        </>
    )
}