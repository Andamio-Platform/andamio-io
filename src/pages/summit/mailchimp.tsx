import styles from "../../styles/AndamioComponent.module.css";

const MailchimpForm = () => {
  return (
    <form
      action="https://andamio.us14.list-manage.com/subscribe/post?u=60f4a303edeadb1e8c886bd0f&amp;id=06a7831afd&amp;f_id=00dce0e0f0"
      method="POST"
      className="flex flex-col items-center"
    >
      <input
        type="email"
        name="EMAIL" // This name is required by Mailchimp to capture email
        className={` ${styles.textPrimary} mb-4 w-80 rounded-sm p-3`}
        placeholder="Enter your email"
        required
      />
      <button
        type="submit"
        className={`${styles.btnSecondary} rounded-md px-6 py-3 text-xl font-bold transition`}
      >
        Subscribe
      </button>
    </form>
  );
};

export default MailchimpForm;
