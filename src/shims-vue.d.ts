declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "vuetify/lib" {
  import "vuetify/types/lib";
}

type ShareOptions = { title: string; text: string; url: string };

type NavigatorShare = (options: ShareOptions) => Promise<{}>;

interface Navigator {
  share?: NavigatorShare;
}
