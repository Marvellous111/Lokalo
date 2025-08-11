<script lang="ts" setup>
import { Globe, ChevronDown, ShoppingBag, MapPinned } from 'lucide-vue-next';
import { computed, ref, watch } from 'vue';

//var toast_type = ref<string|null>(null)
const toastWrapper = ref<HTMLElement|null>(null);
const locStore = useLocStore();
const errorStore = useErrorStore();

const stateStore = useStateStore();

const openToast = () => {
  if (!toastWrapper.value) return
  console.log("Opening toast after return")
  toastWrapper.value.style.visibility = "visible";
  toastWrapper.value.style.opacity = "1";
}
const closeToast = () => {
  console.log("closing toast after return")
  if (!toastWrapper.value) return
  toastWrapper.value.style.visibility = "hidden";
  toastWrapper.value.style.opacity = "0";
}

const getUserLocation = async () => {
  closeToast()
  const { reverseGeocode, getLocationCoordinates } = useLocationServices();
  var userLoc = ref<{lat: number, lng:number} | null>(null);

  try {
    const userPositionCoords = await getLocationCoordinates();
    const { latitude, longitude } = userPositionCoords.coords;
    const coords = { lat: latitude, lng: longitude };
    userLoc.value = coords;
    // Set logging here to check on server side if it is from the native browser or the api
  }catch(error) {
    console.error(`An error occured while getting and saving pos: ${error}`);
    stateStore.changeLocationReady(true, true);
    // Cant the error just open toast here??
    errorStore.changeToastType('error');
    if (errorStore.positionErrorStatus == false) {
      errorStore.changePositionErrorStatus('Could not get your location');
      openToast()
    } else {
      openToast()
    }
    return
  }
  // if (userLoc.value == null) {
  //   errorStore.changeToastType('error')
  //   if (errorStore.positionErrorStatus == false) {
  //     errorStore.changePositionErrorStatus("Could not get your location");
  //     openToast()
  //   }else {
  //     openToast()
  //   }
  //   return
  // }
  errorStore.changeToastType(null)
  closeToast() // I dont know why this is necessary tbh
  if (errorStore.positionErrorStatus == true) {
    errorStore.changePositionErrorStatus(null)
    closeToast()
  }

  try {
    const geodetails = await reverseGeocode(userLoc.value); // This is a bit too abstract now under layers of fetching but it will do for now
    locStore.saveTargetLang(geodetails.language);
    locStore.saveLocCoords(userLoc.value, geodetails.countryName, geodetails.city, geodetails.principalSubdivision);
    if (errorStore.positionErrorStatus == true) {
      errorStore.changePositionErrorStatus(null);
      closeToast()
    }
    console.info("Saved position");
    stateStore.changeLocationReady(true, false);
  } catch(error) {
    stateStore.changeLocationReady(true, true);
    errorStore.changeToastType('error');
    errorStore.changePositionErrorStatus("Could not get your location");
    openToast()
    console.error(`An error occured while trying to save location from geo-client: ${error}`)
  }
}


const changeError = () => { // Will remove this to getUserLocation later
  errorStore.changeToastType(null);
  errorStore.changePositionErrorStatus(null)
  if (!toastWrapper.value) return
  toastWrapper.value.style.visibility = "hidden";
  toastWrapper.value.style.opacity = "0";
}

const auth_type = ref('signin');

const openAuthToast = () => {
  errorStore.changeToastType('auth');
  openToast()
}

const changeAuthToast = () => {
  if(auth_type.value == 'signin') {
    auth_type.value = 'signup'
  } else if (auth_type.value == 'signup') {
    auth_type.value = 'signin'
  }
}

const closeAuthToast = () => {
  errorStore.changeToastType(null)
  closeToast()
}

// We should strive to get the position before the website is mounted for better location performance for when we finally fetch data
onBeforeMount(async () => {
  closeToast()
  try {
    await getUserLocation()
  } catch(error) {
    console.log(error)
  }
})

const error_status = computed(() => errorStore.toastType == "error")

watch(error_status, (newValue) => {
  if (newValue) {
    openToast()
  } else {
    closeToast()
  }
}, { immediate: true })

</script>

<template>
  <div class="main-wrapper">
    <nav>
      <section class="lf-wrapper">
        <div class="company-logo-text">
          <span class="geist-medium">Lokalo</span>
        </div>
        <div class="features">
          <NuxtLink to="/" class="feature-link">
            <div class="feature-link-icon">
              <ShoppingBag
                :size="18"
                :stroke-width="1.5"
                absoluteStrokeWidth
                class="link"
              />
            </div>
            <span class="geist-medium">Deals</span>
          </NuxtLink>
          <NuxtLink to="map" class="feature-link">
            <div class="feature-link-icon">
              <MapPinned
                :size="18"
                :stroke-width="1.5"
                absoluteStrokeWidth
                class="link"
              />
            </div>
            <span class="geist-medium">Map</span>
          </NuxtLink>
        </div>
      </section>
      <section class="signin-wrapper">
        <button class="globe-wrapper">
          <Globe
            :stroke-width="1.5"
            :size="18"
            absoluteStrokeWidth
            class="globe-icon"
          />
        </button>
        <button class="signin-button" @click="openAuthToast">
          <span class="geist-medium">Sign in</span>
        </button>
      </section>
    </nav>
    <section class="toast-wrapper" ref="toastWrapper">
      <div v-if="errorStore.toastType == 'error'">
        <GeneralToastsError
          v-if="errorStore.positionErrorStatus == true"
          :error_message="errorStore.positionErrorMessage"
          error_function_message="Try again"
          @error_function="getUserLocation"
        />
      </div>
      <div v-if="errorStore.toastType == 'auth'">
        <GeneralToastsAuthenticationSignin
          v-if="auth_type == 'signin'"
          @change-toast="changeAuthToast"
          @close-toast="closeAuthToast"
        />
        <GeneralToastsAuthenticationSignup
          v-if="auth_type == 'signup'"
          @change-toast="changeAuthToast"
          @close-toast="closeAuthToast"
        />
      </div>
    </section>
    <section class="body">
      <slot />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.main-wrapper {
  height: fit-content;
  width: stretch;
  position: relative;
  .toast-wrapper {
    z-index: 30;
    position: fixed;
    top: 0;
    left: -20px;
    width: stretch;
    height: stretch;
    // visibility: hidden;
    // opacity: 0;
    transition: visibility 0.2s ease-in, opacity 0.2s ease-in;
    div {
      width: stretch;
      height: stretch;
    }
  }
  nav {
    height: 100px;
    //border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: stretch;
    padding: 0px 40px;
    .lf-wrapper {
      display: flex;
      align-items: center;
      //border: 1px solid black;
      column-gap: 100px;
      .company-logo-text {
        span {
          font-size: 28px;
          letter-spacing: -2px;
          color: #90ee90;
        }
      }
      .features {
        display: flex;
        align-items: center;
        column-gap: 20px;
        .feature-link {
          outline: 0;
          text-decoration: none;
          display: flex;
          align-items: center;
          column-gap: 5px;
          transition: 0.2s ease-in;
          div {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #121212;
          }
          span {
            color: #121212;
            font-size: 15px;
            transition: 0.1s ease-in;
            position: relative;
          }
        }
        .feature-link:hover {
          span::before {
            content: '';
            border: 1px solid rgba(18, 18, 18, 0.5);
            position: absolute;
            bottom: 0;
            left: 0;
            width: stretch;
          }
          span {
            color: rgba(18, 18, 18, 0.5);
          }
        }
      }
    }
    .signin-wrapper {
      display: flex;
      align-items: center;
      column-gap: 15px;
      //border: 1px solid black;
      button {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .globe-wrapper {
        background: rgba(220, 220, 220, 0.2);
        outline: 0;
        border: 0;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        padding: 5px;
        cursor: pointer;
        transition: 0.2s ease-in;
        .globe-icon {
          color: rgba(18, 18, 18, 0.5);
          transition: 0.1s ease-in;
        }
      }
      .globe-wrapper:hover {
        background: rgba(230, 230, 230, 0.6);
        .globe-icon {
          color: #121212;
        }
      }
      .signin-button {
        border: 0;
        border-radius: 25px;
        height: 38px;
        min-width: 100px;
        background: rgba(230, 230, 230, 0.6); 
        outline: 0;
        padding: 7.5px 20px;
        cursor: pointer;
        transition: 0.1s ease-in;
        span {
          font-size: 15px;
          letter-spacing: -0.8px;
          color: rgba(18, 18, 18, 0.5);
          transition: 0.2s ease-in;
        }
      }
      .signin-button:hover {
        background: rgba(18, 18, 18, 1);
        span {
          color: #FFFFFF;
        }
      }
    }
  }
  .body {
    width: stretch;
    height: stretch;
    padding: 20px 70px;
    padding-bottom: 100px;
  }
}
@include responsive(mobile) {
  .main-wrapper {
    width: stretch;
    nav {
      width: stretch;
      height: 50px;
      padding: 0px 10px;
      .lf-wrapper {
        column-gap: 20px;
        .company-logo-text {
          display: none;
        }
      }
    }
    .body {
      // border: 1px solid black;
      padding: 10px 10px;
      padding-bottom: 40px;
    }
    .toast-wrapper {
      left: 0;
    }
  }
}
</style>