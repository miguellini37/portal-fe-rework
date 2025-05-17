export const Alumni = () => {
  return (
    <div className="Alumni">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">UCLA Bruins Community</h2>
        <p className="text-gray-400 mt-2 max-w-2xl">
          Connect with fellow UCLA student-athletes and alumni to share achievements, network, and
          stay engaged.
        </p>
      </div>
      <div className="space-y-6">
        {/* <!-- Upcoming School Events --> */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Upcoming Events</h3>
          <div id="school-events" className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
        </div>
        {/* <!-- Post Creation --> */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <form id="post-form" onSubmit={() => {}}>
            <textarea
              id="post-content"
              className="form-textarea mb-4 resize-none"
              rows={3}
              placeholder="Share your latest achievement or update..."
              required
            ></textarea>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Post
              </button>
            </div>
          </form>
        </div>
        {/* Community Feed --> */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Recent Posts</h3>
          <div id="community-feed" className="space-y-4"></div>
        </div>
      </div>
    </div>
  );
};
