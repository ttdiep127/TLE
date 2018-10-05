using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Entities.Models
{
    public partial class TLEContext : DbContext
    {
        public TLEContext()
        {
        }

        public TLEContext(DbContextOptions<TLEContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Answers> Answers { get; set; }
        public virtual DbSet<Paragraph> Paragraph { get; set; }
        public virtual DbSet<ParagraphQuestion> ParagraphQuestion { get; set; }
        public virtual DbSet<Qtions> Qtions { get; set; }
        public virtual DbSet<Ratings> Ratings { get; set; }
        public virtual DbSet<TagQtions> TagQtions { get; set; }
        public virtual DbSet<TestQtions> TestQtions { get; set; }
        public virtual DbSet<Tests> Tests { get; set; }
        public virtual DbSet<TestTypes> TestTypes { get; set; }
        public virtual DbSet<Topics> Topics { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=DIEPTRAN;Database=TLE;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Answers>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.QtionId });

                entity.Property(e => e.UpdateDay).HasColumnType("datetime");

                entity.HasOne(d => d.Qtion)
                    .WithMany(p => p.Answers)
                    .HasForeignKey(d => d.QtionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Answers_Qtions");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Answers)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Answers_Users");
            });

            modelBuilder.Entity<ParagraphQuestion>(entity =>
            {
                entity.HasKey(e => new { e.ParagraphId, e.Position });

                entity.HasOne(d => d.Paragraph)
                    .WithMany(p => p.ParagraphQuestion)
                    .HasForeignKey(d => d.ParagraphId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ParagraphQuestion_Paragraph");

                entity.HasOne(d => d.Question)
                    .WithMany(p => p.ParagraphQuestion)
                    .HasForeignKey(d => d.QuestionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ParagraphQuestion_Qtions");
            });

            modelBuilder.Entity<Qtions>(entity =>
            {
                entity.Property(e => e.Answer1).HasMaxLength(1000);

                entity.Property(e => e.Answer2).HasMaxLength(1000);

                entity.Property(e => e.Answer3).HasMaxLength(1000);

                entity.Property(e => e.Answer4).HasMaxLength(1000);

                entity.Property(e => e.ContentQ).HasMaxLength(1000);
            });

            modelBuilder.Entity<Ratings>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.UpdateDay).HasColumnType("date");

                entity.HasOne(d => d.Topic)
                    .WithMany(p => p.Ratings)
                    .HasForeignKey(d => d.TopicId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Ratings_Topics");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Ratings)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Ratings_Users");
            });

            modelBuilder.Entity<TagQtions>(entity =>
            {
                entity.HasKey(e => new { e.QtionId, e.TopicId });

                entity.HasOne(d => d.Qtion)
                    .WithMany(p => p.TagQtions)
                    .HasForeignKey(d => d.QtionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TagQtions_Qtions");

                entity.HasOne(d => d.Topic)
                    .WithMany(p => p.TagQtions)
                    .HasForeignKey(d => d.TopicId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TagQtions_Topics");
            });

            modelBuilder.Entity<TestQtions>(entity =>
            {
                entity.HasKey(e => new { e.TestId, e.QtionId });

                entity.HasOne(d => d.Qtion)
                    .WithMany(p => p.TestQtions)
                    .HasForeignKey(d => d.QtionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TestQtions_Qtions");

                entity.HasOne(d => d.Test)
                    .WithMany(p => p.TestQtions)
                    .HasForeignKey(d => d.TestId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TestQtions_Tests");
            });

            modelBuilder.Entity<Tests>(entity =>
            {
                entity.Property(e => e.Title).HasMaxLength(500);

                entity.HasOne(d => d.Type)
                    .WithMany(p => p.Tests)
                    .HasForeignKey(d => d.TypeId)
                    .HasConstraintName("FK_Tests_Types");
            });

            modelBuilder.Entity<TestTypes>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(500);
            });

            modelBuilder.Entity<Topics>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(500);
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.Property(e => e.EmailAddress)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.FirstName).HasMaxLength(225);

                entity.Property(e => e.FullName).HasMaxLength(500);

                entity.Property(e => e.JoinedDate).HasColumnType("datetime");

                entity.Property(e => e.LastName).HasMaxLength(225);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(225);

                entity.Property(e => e.Token).HasMaxLength(50);

                entity.Property(e => e.TokenCreatedDate).HasColumnType("datetime");
            });
        }
    }
}
