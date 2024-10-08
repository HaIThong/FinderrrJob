import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import RequiredMark from "../../../../../../components/form/requiredMark/RequiredMark";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "react-bootstrap/Modal";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import candidateApi from "../../../../../../api/candidate";

export default function PersonalInforFormDialog({
  isEdit,
  setIsEdit,
  personal,
  hasImg,
  setHasImg,
  getPersonal,
}) {
  const requiredMsg = "Không được để trống";
  const schema = yup.object({
    lastname: yup.string().required(requiredMsg),
    firstname: yup.string().required(requiredMsg),
    gender: yup.number().required(requiredMsg),
    dob: yup.string().required(requiredMsg),
    phone: yup
      .string()
      .required(requiredMsg)
      .matches(/^[0-9]{10}$/, "Sai định dạng số điện thoại"),
    email: yup.string().email("Sai định dạng email").required(requiredMsg),
    address: yup.string().required(requiredMsg),
    link: yup.string().url("Sai định dạng URL"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      lastname: personal.lastname || "",
      firstname: personal.firstname || "",
      gender: personal.gender || "",
      dob: personal.dob || "",
      phone: personal.phone || "",
      email: personal.email || "",
      address: personal.address || "",
      link: personal.link || "",
      objective: personal.objective || "",
    },
  });

  const [isDeleteImg, setIsDeleteImg] = useState(false);
  const [previewImg, setPreviewImg] = useState(personal.avatar || "");

  const handleDisplayImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result);
        setHasImg(true);
        setIsDeleteImg(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImg = () => {
    setPreviewImg("");
    setHasImg(false);
    setIsDeleteImg(true);
    let imgInput = document.getElementById("avatar-upload");
    imgInput.value = null;
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("lastname", data.lastname);
    formData.append("firstname", data.firstname);
    formData.append("gender", data.gender);
    formData.append("dob", data.dob);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("link", data.link);
    formData.append("objective", data.objective);
    
    if (hasImg) {
      formData.append("image", data.image[0]);
    }
    if (isDeleteImg) {
      formData.append("delete_img", 1);
    }

    try {
      const res = await candidateApi.update(formData);
      alert("Cập nhật thành công!");
      await getPersonal();
      setIsEdit(false);
    } catch (error) {
      console.error("Error updating personal information:", error);
      alert("Cập nhật thất bại!");
    }
  };

  useEffect(() => {
    if (personal.avatar) {
      setPreviewImg(personal.avatar);
      setHasImg(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personal.avatar]);

  return (
    <Modal
      show={isEdit}
      onHide={() => setIsEdit(false)}
      centered
      size="lg"
      fullscreen="md-down"
    >
      <Modal.Header closeButton>
        <Modal.Title>Thông tin cá nhân</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="horizontal" gap="5">
            <div
              className="text-center"
              style={{ width: "150px", height: "150px" }}
            >
              {previewImg ? (
                <img
                  src={previewImg}
                  alt="avatar"
                  width="100%"
                  height="100%"
                  className="rounded-pill avatar-img"
                />
              ) : (
                <FaUser
                  className="rounded-pill text-bg-secondary p-1"
                  style={{ fontSize: "130px" }}
                />
              )}
            </div>
            <Form.Group>
              <Form.Label className="ts-smd">Tải ảnh lên</Form.Label>
              <Form.Control
                id="avatar-upload"
                type="file"
                size="sm"
                {...register("image")}
                onChange={(e) => handleDisplayImg(e)}
              />
              <Button
                variant="outline-danger"
                size="sm"
                className="mt-2"
                onClick={handleDeleteImg}
              >
                Xóa ảnh
              </Button>
            </Form.Group>
          </Stack>
          <hr />
          <div className="row row-cols-md-2 row-cols-sm-1">
            <Form.Group className="mt-2">
              <Form.Label className="fw-600">Họ và tên</Form.Label>
              <RequiredMark />
              <div className="d-flex">
                <Form.Control
                  size="sm"
                  type="text"
                  className="me-3"
                  placeholder="Họ"
                  {...register("lastname")}
                  isInvalid={errors.lastname}
                />
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Tên"
                  {...register("firstname")}
                  isInvalid={errors.firstname}
                />
              </div>
              <div className="text-danger mt-1" style={{ fontSize: "0.875em" }}>
                {errors.lastname || errors.firstname
                  ? "Vui lòng nhập đủ họ và tên"
                  : null}
              </div>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label className="fw-600">Giới tính</Form.Label>
              <RequiredMark /> <br />
              <Form.Check
                type="radio"
                label="Nam"
                inline
                value={0}
                {...register("gender")}
                defaultChecked={personal.gender === 0}
              />
              <Form.Check
                type="radio"
                label="Nữ"
                inline
                value={1}
                {...register("gender")}
                defaultChecked={personal.gender === 1}
              />
              <Form.Control isInvalid={errors.gender} className="d-none" />
              <Form.Control.Feedback type="invalid">
                {requiredMsg}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label className="fw-600">Ngày sinh</Form.Label>
              <RequiredMark />
              <Form.Control
                size="sm"
                type="date"
                {...register("dob")}
                isInvalid={errors.dob}
              />
              <Form.Control.Feedback type="invalid">
                {errors.dob?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label className="fw-600">Số điện thoại</Form.Label>
              <RequiredMark />
              <Form.Control
                size="sm"
                type="text"
                {...register("phone")}
                isInvalid={errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label className="fw-600">Email</Form.Label>
              <RequiredMark />
              <Form.Control
                size="sm"
                type="text"
                {...register("email")}
                isInvalid={errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label className="fw-600">Địa chỉ</Form.Label>
              <RequiredMark />
              <Form.Control
                size="sm"
                type="text"
                {...register("address")}
                isInvalid={errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label className="fw-600">Liên kết</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                {...register("link")}
                isInvalid={errors.link}
              />
              <Form.Control.Feedback type="invalid">
                {errors.link?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <Form.Group className="mt-2">
            <Form.Label className="fw-600">Mục tiêu nghề nghiệp</Form.Label>
            <Form.Control
              as={"textarea"}
              rows={5}
              size="sm"
              {...register("objective")}
            />
          </Form.Group>
          <Stack direction="horizontal" gap={3} className="mt-3">
            <Button
              variant="outline-primary"
              size="sm"
              type="submit"
              className="ms-auto"
            >
              Lưu
            </Button>
            <Button
              variant="danger"
              size="sm"
              type="reset"
              className="me-3"
              onClick={() => setIsEdit(false)}
            >
              Hủy
            </Button>
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
