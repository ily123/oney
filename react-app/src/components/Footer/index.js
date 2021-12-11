import styles from './Footer.module.css';
import CONTRIBUTORS from './contributors';

export default function Footer () {
  return (
    <footer>
      <div className={styles.madeby}>
        <a target="_blank" href="https://github.com/ily123/oney" rel="noreferrer">
          <i className="fab fa-github-square" />
        </a>
        Oney was made by
      </div>
      <div className={styles.contributors}>
        {CONTRIBUTORS.map(person =>{ 
          return <PersonCard key={"persoon_"+person.name} person={person} />
        })}
      </div>
    </footer>
  );
}

function PersonCard ({ person }) {
  const { name, gh, linkd, email } = person;
  return (
    <div className={styles.personCard}>
      <div className='my-name'>
        { name }
      </div>
      <div className={styles.socialMediaLinks}>
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
