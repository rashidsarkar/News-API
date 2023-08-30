const tabContainer = document.getElementById("tab-container");
const handleCatagory = async () => {
  const res = await fetch(
    " https://openapi.programming-hero.com/api/news/categories"
  );
  const data = await res.json();
  const newses = data.data.news_category;
  // console.log(newses);
  newses.slice(0, 3).forEach((catagory) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <a onclick="handleLoadNews('${catagory.category_id}')" class="tab">${catagory.category_name}</a>
   
    `;
    tabContainer.appendChild(div);
  });
};

const handleLoadNews = async (catagoryID) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${catagoryID}`
  );
  const data = await res.json();
  const newses = data.data;
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  newses?.forEach((news) => {
    const div = document.createElement("div");
    // console.log(news);
    div.innerHTML = `
    <div class="flex justify-center items-center"  >
    <div class="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src="${news?.image_url}">
      </figure>
      <div class="card-body">
        <h2 class="card-title">
          ${news?.title.slice(0, 40)}
          <div class="badge badge-secondary p-5">${news.rating?.badge}</div>
        </h2>
        <p>
          ${news.details.slice(0, 60)}
        </p>
        <h3> totoal viws: ${news?.total_view || "NO View"}</h3>
        <div class="card-footer flex justify-between mt-8">
          <div class="flex">
            <div>
              <div class="avatar online">
                <div class="w-14 rounded-full">
                  <img
                    src="${news.author?.img}">
                </div>
              </div>
            </div>
            <div>
              <h6>${news.author?.name}</h6>
              <small>${news.author?.published_date}</small>
            </div>
          </div>
          <div class="card-detaild-btn">
            <button onclick="handleModal('${news._id}')" 
              class="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
              Details
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
    `;
    cardContainer.appendChild(div);
  });
};
const handleModal = async (newsID) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/${newsID}`
  );
  const datas = await res.json();

  const [data] = datas.data;
  const div = document.createElement("div");
  const modalContainer = document.getElementById("modal-container");
  div.innerHTML = `
  <!-- You can open the modal using ID.showModal() method -->

  <dialog id="my_modal_4" class="modal">
  <form method="dialog" class="modal-box w-11/12 max-w-5xl">
  <div class="card w-auto bg-base-100 shadow-xl">
  <figure>
  <img src="${data.thumbnail_url}" alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${data.title}</h2>
    <p>${data.details}</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Close</button>
    </div>
  </div>
</div>
  </form>
</dialog>
  
  `;
  modalContainer.appendChild(div);
  const modal = document.getElementById("my_modal_4");
  modal.showModal();

  console.log(data);
};
handleCatagory();
handleLoadNews("01");

/* <button class="btn" onclick="my_modal_4.showModal()">open modal</button>
<dialog id="my_modal_4" class="modal"></dialog> */
