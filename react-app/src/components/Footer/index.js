import styles from './Footer.module.css';
import CONTRIBUTORS from './contributors';

export default function Footer () {
  return (
    <footer>
      <div>made by</div>
      <div>
        {CONTRIBUTORS.map(person =>{ 
          return <PersonCard person={person} />
        })}
      </div>
    </footer>
  );
}

function PersonCard ({ person }) {
  const { name, gh, linkd, email } = person;
  return (
    <div>
      <div className='my-name'>
        { name }
      </div>
      <div className="social-media-links">
        <a target="_blank" href={gh} rel="noreferrer">
          <i className="fab fa-github-square"/>
        </a>
        <a target="_blank" href={linkd} rel="noreferrer">
          <i className="fab fa-linkedin"/>
        </a>
        <a target="_blank" href={email} rel="noreferrer">
          <i className="fas fa-envelope-square"/>
        </a>
      </div>
    </div>
  )
}
