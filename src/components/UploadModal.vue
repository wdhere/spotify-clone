<script setup>
import uniqid from "uniqid";
import { twMerge } from "tailwind-merge";
import { supabase } from "@/supabase";
import { Field, Form } from "vee-validate";

import { useRouter } from "vue-router";

import { useUploadModal } from "@/composables/useUploadModal";
import { useAuthUser } from "../composables/useAuthUser";

import Modal from "./Modal.vue";
import Button from "./Button.vue";
import { ref, computed } from "vue";

const isLoading = ref(false);

const uploadModal = useUploadModal();
const authUser = useAuthUser();
const router = useRouter();

const classSetup = computed(() =>
  twMerge(
    "flex w-full rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none",
    isLoading.value && "opacity-75"
  )
);

const onChange = (open) => {
  if (!open) {
    uploadModal.onClose();
  }
};

const onSubmit = async (values) => {
  try {
    isLoading.value = true;

    if (
      !values.author ||
      !values.title ||
      !values.song ||
      !values.image ||
      !authUser.user
    ) {
      alert("Missing fields");
      return;
    }

    const uniqueID = uniqid();

    // Upload song
    const { data: songData, error: songError } = await supabase.storage
      .from("songs")
      .upload(`song-${values.title}-${uniqueID}`, values.song, {
        cacheControl: "3600",
        upsert: false,
      });

    if (songError) {
      isLoading.value = false;
      return alert("Failed song upload");
    }

    // Upload image
    const { data: imageData, error: imageError } = await supabase.storage
      .from("images")
      .upload(`image-${values.title}-${uniqueID}`, values.image, {
        cacheControl: "3600",
        upsert: false,
      });

    if (imageError) {
      isLoading.value = false;
      return alert("Failed image upload");
    }

    // Create record
    const { error: supabaseError } = await supabase.from("songs").insert({
      user_id: authUser.user.id,
      title: values.title,
      author: values.author,
      image_path: imageData.path,
      song_path: songData.path,
    });

    if (supabaseError) {
      isLoading.value = false;
      return alert(supabaseError.message);
    }

    // alert("Song created!");
    uploadModal.onClose();
  } catch (error) {
    alert("Something went wrong");
  } finally {
    isLoading.value = false;
    router.go(0);
  }
};
</script>

<template>
  <Modal
    title="Add a song"
    description="Upload an mp3 file"
    :isOpen="uploadModal.isOpen"
    :onChange="onChange"
  >
    <Form
      @submit="onSubmit"
      class="flex flex-col gap-y-4"
    >
      <Field
        name="title"
        :class="classSetup"
        :disabled="isLoading"
        placeholder="Song title"
      />
      <Field
        name="author"
        :class="classSetup"
        :disabled="isLoading"
        placeholder="Song author"
      />
      <div>
        <div class="pb-1">Select a song file</div>
        <Field
          name="song"
          :class="classSetup"
          :disabled="isLoading"
          type="file"
          accept=".mp3"
        />
      </div>
      <div>
        <div class="pb-1">Select an image</div>
        <Field
          name="image"
          type="file"
          accept="image/*"
          :class="classSetup"
        />
      </div>
      <Button
        :disabled="isLoading"
        type="submit"
      >
        Create
      </Button>
    </Form>
  </Modal>
</template>
