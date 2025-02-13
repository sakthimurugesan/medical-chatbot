from django.db import models


class Doctor(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]
    trend1 = models.PositiveIntegerField(help_text="1 for event to display in home page", default=0, blank=True)
    name = models.CharField(max_length=255)
    self_intro = models.TextField()
    image = models.CharField(max_length=255)
    dept = models.CharField(max_length=100)
    qualification = models.CharField(max_length=100)
    dob = models.DateField()
    email = models.EmailField()
    phone = models.CharField(max_length=100)
    fees=models.DecimalField(max_digits=10,decimal_places=5,null=True,blank=True)
    education=models.TextField(null=True,blank=True)
    date_joined=models.DateField(null=True,blank=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    city = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)
    password = models.CharField(max_length=120, null=True, blank=True)
    zipcode = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name


class Patient(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    dob = models.DateField()
    city = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)
    zipcode = models.CharField(max_length=100, null=True, blank=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    termsAccepted = models.BooleanField()
    weight = models.DecimalField(max_digits=10, decimal_places=5, null=True, blank=True)
    height = models.DecimalField(max_digits=10, decimal_places=5, null=True, blank=True)
    blood = models.CharField(max_length=15, null=True, blank=True)

    class Meta:
        verbose_name_plural = "Patients"

    def __str__(self):
        return self.email


class Admins(models.Model):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    dob = models.DateField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zipcode = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "Admins"

    def __str__(self):
        return self.email


class Availability(models.Model):
    doctorId = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    date = models.DateField()
    available = models.BooleanField(default=False)
    count = models.PositiveIntegerField()


class Appointment(models.Model):
    patientId = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctorId = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    date = models.DateField()
    status=models.CharField(max_length=100, null=True, blank=True)
    transactionId = models.CharField(max_length=100, null=True, blank=True)
    def __str__(self):
        return "{} {}".format(self.doctorId.name, self.patientId.name)


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    sendCopy = models.BooleanField()

    def __str__(self): return self.email


class Review(models.Model):
    rating = models.PositiveIntegerField(default=0)
    review = models.TextField()
    doctorId=models.ForeignKey(Doctor,on_delete=models.CASCADE,blank=True,null=True)
    userId = models.ForeignKey(Patient, on_delete=models.CASCADE)
